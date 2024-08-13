import { type Client, isFullPage } from '@notionhq/client'
import type { GallerySchemaType } from '~/schema/gallery'
import { GallerySchema, galleryFilters, galleryKey, galleryQuery } from '~/schema/gallery'

export async function getGalleryByPositionAsync(notion: Client | null, position: string, refresh: boolean): Promise<GallerySchemaType[]> {
  if (!position) return []

  const key = `${galleryKey}:${position}`

  let items: GallerySchemaType[] | null = null

  if (!refresh) {
    items = await redis.get<GallerySchemaType[]>(key)
  }

  if (items === null) {
    items = await fetchNotionDataAsync<GallerySchemaType>(
      notion,
      {
        ...galleryQuery,
        filter: {
          and: [...galleryFilters, { property: '位置', select: { equals: position } }],
        },
      },
      processGalleryDataAsync,
    )
    if (items) await redis.set(key, items)
  }

  return items.filter((item) => isWithinDateRange(item.發布期間))
}

export async function processGalleryDataAsync(_: Client | null, item: any): Promise<GallerySchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: GallerySchemaType = GallerySchema.parse(item.properties)
  parseItem.圖片_PC = mapImgUrl(parseItem.圖片_PC, item.id)
  parseItem.圖片_M = mapImgUrl(parseItem.圖片_M, item.id)

  return parseItem
}
