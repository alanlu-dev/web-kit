import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import type { GallerySchemaType } from '~/schema/gallery'
import { GallerySchema } from '~/schema/gallery'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async (event) => {
  try {
    const paramPosition = getRouterParam(event, 'position')
    if (!paramPosition) return []

    const position = decodeURIComponent(paramPosition)

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_GALLERIES!,
      filter: {
        and: [
          { property: '位置', select: { equals: position } },
          { property: '資料驗證', formula: { string: { equals: '✅' } } },
          { property: '封存', checkbox: { equals: false } },
        ],
      },
      filter_properties: ['title', 'dBtm', 'f%3Eo%60', 'x%60DM'],
      sorts: [{ property: '排序', direction: 'ascending' }],
    })

    const arr: GallerySchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      arr.push(GallerySchema.parse(item.properties))
    })

    return arr.filter((item) => {
      if (item.發布狀態.name === '草稿') return false

      if (process.env.VERCEL_ENV === 'production') {
        if (item.發布狀態.name !== '發布') return false
      }
      return true
    })
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
