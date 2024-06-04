import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { CourseEventSchemaType } from '~/schema/course_event'
import { CourseEventSchema } from '~/schema/course_event'

export default defineEventHandler<{ query: { page?: string; page_size?: string; refresh?: boolean } }>(async (event) => {
  const { page, page_size, refresh } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 10

  const key = `course_event`

  try {
    if (!refresh) {
      const data = await kv.lrange(key, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
      console.log('cache hit', key)
      if (data) return data

      if ((await kv.llen(key)) === 0) return []
    }
    else {
      kv.del(key)
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const allData: CourseEventSchemaType[] = []
    let start_cursor: string | undefined

    while (true) {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID_COURSE_EVENTS!,
        start_cursor,
        page_size: pageSize,
        filter: {
          and: [
            { property: '封存', checkbox: { equals: false } },
            { property: '課程驗證', formula: { string: { equals: '✅' } } },
            { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
          ],
        },
        filter_properties: [
          /** 編號 */
          'title',
          /** 上課日期 */
          '%7D%3EfP',
          /** 課程 */
          'k_%5Ev',
          /** 課程標題 */
          '%5BYP%5B',
          /** 課程標籤 */
          'ZBzH',
          /** 最終價格 */
          'KF%3FY',
          /** 教室名稱 */
          'Azcq',
          /** 教室地址 */
          '~~VH',
          /** 名額限制 */
          'MZlx',
          /** 報名人數 */
          'uuzW',
        ],
        sorts: [{ property: '上課日期', direction: 'descending' }],
      })

      const arr = (
        await Promise.all(
          response.results.map(async (item) => {
            if (!isFullPage(item)) return null
            const parseItem = CourseEventSchema.parse(item.properties)
            parseItem.ID = item.id.replaceAll('-', '')

            const response = await notion.pages.properties.retrieve({ page_id: parseItem.課程!, property_id: 'r%3ENY' })
            if (response.type === 'files' && response.files[0].type === 'file') {
              parseItem.課程圖片連結 = response.files[0].file.url
            }
            return parseItem
          }),
        )
      ).filter((item): item is CourseEventSchemaType => item !== null)

      arr.forEach((item) => {
        allData.push(item)

        kv.rpush(key, item)
      })

      if (!response.has_more) {
        break
      }

      start_cursor = response.next_cursor!
    }

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
