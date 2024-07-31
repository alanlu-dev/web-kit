import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { kv } from '@vercel/kv'
import type { InstructorSchemaType } from '~/schema/instructor'
import { CertificationSchema, InstructorSchema, InvitedLectureSchema } from '~/schema/instructor'

export default defineEventHandler<{ query: { page?: string; page_size?: string; refresh?: boolean } }>(async (event) => {
  const { page, page_size, refresh } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 10

  const key = `instructors`

  try {
    if (!refresh) {
      const data = await kv.lrange(key, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
      if (data.length) {
        console.log('cache hit', key)
        return data
      }
      else if (currentPage > 1) {
        return data
      }
    }
    else {
      await kv.del(key)
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const allData: InstructorSchemaType[] = []
    let start_cursor: string | undefined

    while (true) {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID_INSTRUCTORS!,
        start_cursor,
        page_size: pageSize,
        // filter: {
        //   and: [
        //     { property: '封存', checkbox: { equals: false } },
        //     { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
        //     // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
        //   ],
        // },
        filter_properties: [
          /** 名稱 */
          'title',
          /** 排序 */
          'KfPc',
          /** 英文名 */
          'bQo%5D',
          /** 照片 */
          'ayLr',
          /** 頭銜 */
          'vms%7D',
          /** 標語 */
          'PnrO',
          /** 服務經驗 */
          'ySk%7B',
          /** 工作經驗 */
          'l%7Bbz',
          /** 教學經驗 */
          'O%60rl',
          /** 專業認證 */
          '~dx%3B',
          /** 受邀講座 */
          'UxQF',
        ],
        sorts: [{ property: '排序', direction: 'descending' }],
      })

      const allDataPromises = response.results.map(async (item) => {
        if (!isFullPage(item)) return null
        const parseItem = InstructorSchema.parse(item.properties)
        parseItem.ID = item.id.replaceAll('-', '')

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
            parsedPage.ID = id!.replaceAll('-', '')
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
            parsedPage.ID = id!.replaceAll('-', '')
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
        parseItem.照片 = parseItem.照片.map((img) => mapImgUrl(img, item.id))
        return parseItem
      })

      const data = (await Promise.all(allDataPromises)).filter((item) => item !== null)
      allData.push(...data)

      if (!response.has_more) {
        break
      }

      start_cursor = response.next_cursor!
    }

    await kv.rpush(key, ...allData)

    allData.map(async (item) => {
      await kv.set(`${key}:${item.ID}`, item)
    })

    const currentPageData = allData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return currentPageData
  }
  catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          // ...
          break
        case APIErrorCode.ObjectNotFound:
          // ...
          break
        case APIErrorCode.Unauthorized:
          // ...
          break
      }
    }
    return error
  }
})
