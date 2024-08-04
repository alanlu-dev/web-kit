import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { type Client, isFullPage } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { InstructorSchemaType } from '~/schema/instructor'
import { CertificationSchema, InstructorSchema, InvitedLectureSchema, instructorFilters, instructorKey, instructorQuery } from '~/schema/instructor'

export async function getInstructorByIdAsync(notion: Client | null, id: number, refresh: boolean | undefined = false): Promise<InstructorSchemaType | null> {
  if (!id) return null

  const key = `${instructorKey}:${id}`

  if (!refresh) {
    const item = await kv.get<InstructorSchemaType>(key)

    if (item) {
      console.log('cache hit', key)
      return item
    }
  }

  const item = await fetchNotionDataByIdAsync<InstructorSchemaType>(notion, instructorQuery, instructorFilters, id, processInstructorDataAsync)

  if (item) await kv.set(key, item)

  return item
}

export async function getInstructorsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<InstructorSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheIdAsync<InstructorSchemaType>(instructorKey, currentPage, pageSize)
    if (items !== null) return items
  }
  const items = await fetchNotionDataAsync<InstructorSchemaType>(notion, { ...instructorQuery, page_size: pageSize }, processInstructorDataAsync)

  await kv.del(instructorKey)
  items.map(async (item) => {
    await kv.rpush(instructorKey, item.ID)
    await kv.set(`${instructorKey}:${item.ID}`, item)
  })

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return pageData
}

export async function processInstructorDataAsync(item: any, notion?: Client): Promise<InstructorSchemaType | null> {
  if (!item || !isFullPage(item) || !notion) return null

  const parseItem: InstructorSchemaType = InstructorSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')
  parseItem.照片 = parseItem.照片.map((img) => mapImgUrl(img, item.id))

  // 處理專業認證
  if (parseItem.專業認證?.length) {
    const certificationPromises = parseItem.專業認證.map(async (id) => {
      const page = await notion.pages.retrieve({
        page_id: id!,
        filter_properties: [
          /** 專業認證 */
          'title',
          /** 排序 */
          '%7C%7D%3Ft',
        ],
      })
      const parsedPage = CertificationSchema.parse(NotionPageSchema.parse(page).properties)
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
      return parsedPage
    })
    parseItem.專業認證資訊 = (await Promise.all(certificationPromises))
      .filter((item) => item !== null)
      .sort((a, b) => {
        if (a.排序 == null && b.排序 == null) return 0
        if (a.排序 == null) return 1
        if (b.排序 == null) return -1
        return a.排序 - b.排序
      })
  }

  // 處理受邀講座
  if (parseItem.受邀講座?.length) {
    const lecturePromises = parseItem.受邀講座.map(async (id) => {
      const page = await notion.pages.retrieve({
        page_id: id!,
        filter_properties: [
          /** 受邀講座 */
          'title',
          /** 排序 */
          'uRQf',
        ],
      })
      const parsedPage = InvitedLectureSchema.parse(NotionPageSchema.parse(page).properties)
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
      return parsedPage
    })
    parseItem.受邀講座資訊 = (await Promise.all(lecturePromises))
      .filter((item) => item !== null)
      .sort((a, b) => {
        if (a.排序 == null && b.排序 == null) return 0
        if (a.排序 == null) return 1
        if (b.排序 == null) return -1
        return a.排序 - b.排序
      })
  }

  return parseItem
}

export async function fetchInstructorInfos(notion: Client | null, instructorIds: number[]): Promise<InstructorSchemaType[]> {
  // 去重 instructorIds
  const uniqueInstructorIds = Array.from(new Set(instructorIds))

  const instructorPromises = uniqueInstructorIds.map((id) => getInstructorByIdAsync(notion, id))

  const instructorInfos = await Promise.all(instructorPromises)
  return instructorInfos.filter((info): info is InstructorSchemaType => info !== null)
}
