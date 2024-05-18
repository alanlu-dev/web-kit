import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import type { FaqSchemaType } from '~/schema/faq'
import { FaqSchema } from '~/schema/faq'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_FAQ!,
      // filter: {
      //   and: [
      //     { property: '封存', checkbox: { equals: false } },
      //     { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
      //   ],
      // },
      filter_properties: [
        /** 問題 */
        'title',
        /** 排序 */
        'pOz%60',
        /** 答案 */
        '%60XV%5D',
      ],
      sorts: [{ property: '排序', direction: 'ascending' }],
      // page_size: page_size ? Number.parseInt(page_size) : 10,
    })
    const arr: FaqSchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      const parseItem = FaqSchema.parse(item.properties)
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
