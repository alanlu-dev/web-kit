import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import type { GallerySchemaType } from '~/schema/gallery'
import { GallerySchema } from '~/schema/gallery'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async (event) => {
  try {
    const paramPosition = getRouterParam(event, 'position')
    if (!paramPosition) return []

    const response = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID_GALLERY! })

    const arr: GallerySchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      arr.push(GallerySchema.parse(item.properties))
    })

    const position = decodeURIComponent(paramPosition)
    return arr.filter((item) => item.位置 === position && item.封存 === false && item.資料驗證 === '✅').sort((a, b) => a.排序 - b.排序)
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
