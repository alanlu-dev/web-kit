import { type Client, isFullPage } from '@notionhq/client'
import type { InstructorSchemaType } from '~/schema/instructor'
import { InstructorSchema, instructorFilters, instructorKey, instructorQuery } from '~/schema/instructor'

export async function getInstructorByIdAsync(notion: Client | null, id: number, refresh: boolean): Promise<InstructorSchemaType | null> {
  if (!id) return null

  const key = `${instructorKey}:${id}`

  let item: InstructorSchemaType | null = null

  if (!refresh) {
    item = await redis.get<InstructorSchemaType>(key)
  }

  if (!item) {
    ;[item] = await fetchNotionDataByIdAsync<InstructorSchemaType>({
      notion,
      query: instructorQuery,
      processData: processInstructorDataAsync,
      updateProperties: updateRefreshTime,
      filters: instructorFilters,
      id,
    })
    if (item) await redis.set(key, item)
  }

  return item
}

export async function getInstructorsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<InstructorSchemaType[]> {
  let items: InstructorSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<InstructorSchemaType>(instructorKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<InstructorSchemaType>({
      notion,
      query: { ...instructorQuery, page_size: pageSize },
      processData: processInstructorDataAsync,
      updateProperties: updateRefreshTime,
    })

    if (items.length) {
      await redis.del(instructorKey)
      items.map(async (item) => {
        await redis.rPush(instructorKey, item.ID)
        await redis.set(`${instructorKey}:${item.ID}`, item)
      })

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  return items
}

export async function fetchInstructors(notion: Client | null, instructorIds: number[], refresh: boolean): Promise<InstructorSchemaType[]> {
  const uniqueInstructorIds = Array.from(new Set(instructorIds))

  const instructorPromises = uniqueInstructorIds.map((id) => getInstructorByIdAsync(notion, id, refresh))

  const instructors = await Promise.all(instructorPromises)
  return instructors.filter((info): info is InstructorSchemaType => info !== null)
}

export async function processInstructorDataAsync(_: Client, item: any): Promise<InstructorSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: InstructorSchemaType = InstructorSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')
  parseItem.照片 = parseItem.照片.map((img) => mapImgUrl(img, item.id))

  return parseItem
}
