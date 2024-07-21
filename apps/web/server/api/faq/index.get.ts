import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { FaqSchemaType } from '~/schema/faq'
import { FaqSchema } from '~/schema/faq'

export default defineEventHandler<{ query: { page?: string; page_size?: string; refresh?: boolean } }>(async (event) => {
  const { page, page_size, refresh } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 100

  const key = `faq`

  try {
    if (!refresh) {
      const data = await kv.lrange(key, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
      if (data.length) {
        console.log('cache hit', key)
        return data
      }
    }
    else {
      await kv.del(key)
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const allData: FaqSchemaType[] = []
    let start_cursor: string | undefined

    while (true) {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID_FAQ!,
        start_cursor,
        page_size: pageSize,
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

      response.results.forEach((item) => {
        if (!isFullPage(item)) return false
        const parseItem = FaqSchema.parse(item.properties)
        parseItem.ID = item.id.replaceAll('-', '')
        allData.push(parseItem)
      })

      if (!response.has_more) {
        break
      }

      start_cursor = response.next_cursor!
    }

    await kv.rpush(key, ...allData)

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
