import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import type { NewsSchemaType } from '~/schema/news'
import { NewsSchema } from '~/schema/news'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler<{ query: { page_size?: string } }>(async (event) => {
  try {
    const { page_size } = getQuery(event)

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_NEWS!,
      filter: {
        and: [
          { property: '封存', checkbox: { equals: false } },
          { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
        ],
      },
      filter_properties: [
        /** 標題 */
        'title',
        /** 發布日期 */
        '%3BqzX',
      ],
      sorts: [{ property: '發布日期', direction: 'descending' }],
      page_size: page_size ? Number.parseInt(page_size) : 10,
    })

    const arr: NewsSchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      const parseItem = NewsSchema.parse(item.properties)
      parseItem.ID = item.id.replaceAll('-', '')
      arr.push(parseItem)
    })

    return arr
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
