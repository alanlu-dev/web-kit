import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { CaseSchemaType } from '~/schema/case'
import { CaseSchema } from '~/schema/case'

export default defineEventHandler<{ query: { page?: string; page_size?: string; refresh?: boolean } }>(async (event) => {
  const { page, page_size, refresh } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 10

  const key = `cases`

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

    const allData: CaseSchemaType[] = []
    let start_cursor: string | undefined

    while (true) {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID_CASE!,
        start_cursor,
        page_size: pageSize,
        filter: {
          and: [
            { property: '封存', checkbox: { equals: false } },
            { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
            { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
          ],
        },
        filter_properties: [
          /** 標題 */
          'title',
          /** 分類 */
          'TgYx',
          /** 封面 */
          '%3Dyos',
          /** 影音連結 */
          'X%7D%3FU',
          /** 簡介 */
          'F%3EQ%5D',
        ],
        sorts: [{ property: '發布日期', direction: 'descending' }],
      })

      response.results.forEach((item) => {
        if (!isFullPage(item)) return false
        const parseItem = CaseSchema.parse(item.properties)
        parseItem.ID = item.id.replaceAll('-', '')
        allData.push(parseItem)

        kv.rpush(key, parseItem)
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
