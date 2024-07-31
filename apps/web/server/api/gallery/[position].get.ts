import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { GallerySchemaType } from '~/schema/gallery'
import { GallerySchema } from '~/schema/gallery'

export default defineEventHandler<{ query: { refresh?: boolean } }>(async (event) => {
  const paramPosition = getRouterParam(event, 'position')
  if (!paramPosition) return []
  const position = decodeURIComponent(paramPosition)

  const key = `gallery:${position}`

  const { refresh } = getQuery(event)
  if (!refresh) {
    const data = await kv.get<GallerySchemaType[]>(key)
    if (data) {
      console.log('cache hit', key)
      return data.filter((item) => isWithinDateRange(item.發布期間))
    }
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_GALLERIES!,
      filter: {
        and: [
          { property: '封存', checkbox: { equals: false } },
          { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
          { property: '資料驗證', formula: { string: { equals: '✅' } } },
          { property: '位置', select: { equals: position } },
        ],
      },
      filter_properties: [
        /** 標題 */
        'title',
        /** 圖片_PC */
        'x%60DM',
        /** 圖片_M */
        'yjny',
        /** 導轉連結 */
        'f%3Eo%60',
        /** 另開視窗 */
        'K%5CmR',
        /** 發布期間 */
        'X%5DbD',
      ],
      sorts: [{ property: '排序', direction: 'descending' }],
    })

    const arr: GallerySchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      const gallery = GallerySchema.parse(item.properties)
      gallery.圖片_PC = mapImgUrl(gallery.圖片_PC, item.id)
      gallery.圖片_M = mapImgUrl(gallery.圖片_M, item.id)
      arr.push(gallery)
    })

    // await kv.set(key, arr, { ex: 300 })
    await kv.set(key, arr)

    return arr.filter((item) => isWithinDateRange(item.發布期間))
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
