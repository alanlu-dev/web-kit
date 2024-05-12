import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import type { CaseSchemaType } from '~/schema/case'
import { CaseSchema } from '~/schema/case'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler<{ query: { page_size?: string } }>(async (event) => {
  try {
    const { page_size } = getQuery(event)

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_CASE!,
      filter: {
        and: [
          { property: '封存', checkbox: { equals: false } },
          { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
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
      sorts: [{ property: '標題', direction: 'descending' }],
      page_size: page_size ? Number.parseInt(page_size) : 10,
    })

    const arr: CaseSchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      const parseItem = CaseSchema.parse(item.properties)
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
