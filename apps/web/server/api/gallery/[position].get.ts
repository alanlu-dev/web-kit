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
    const data = await kv.get(key)
    if (data) {
      console.log('cache hit', key)
      return data
    }
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_GALLERIES!,
      filter: {
        and: [
          { property: '位置', select: { equals: position } },
          { property: '資料驗證', formula: { string: { equals: '✅' } } },
          { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
          { property: '封存', checkbox: { equals: false } },
        ],
      },
      filter_properties: [
        /** 標題 */
        'title',
        /** 圖片 */
        'x%60DM',
        /** 導轉連結 */
        'f%3Eo%60',
      ],
      sorts: [{ property: '排序', direction: 'ascending' }],
    })

    const arr: GallerySchemaType[] = []
    response.results.forEach((item) => {
      if (!isFullPage(item)) return false
      const gallery = GallerySchema.parse(item.properties)
      gallery.圖片 = mapImgUrl(gallery.圖片, item.id)
      arr.push(gallery)
    })

    // await kv.set(key, arr, { ex: 300 })
    await kv.set(key, arr)

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
