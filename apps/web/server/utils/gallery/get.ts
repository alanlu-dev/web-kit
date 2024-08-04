import { type Client, isFullPage } from '@notionhq/client'
import type { GallerySchemaType } from '~/schema/gallery'
import { GallerySchema, galleryFilters, galleryKey, galleryQuery } from '~/schema/gallery'

export async function getGalleryByPositionAsync(notion: Client | null, position: string, refresh: boolean | undefined = false): Promise<GallerySchemaType[]> {
  if (!position) return []

  const key = `${galleryKey}:${position}`

  if (!refresh) {
    const items = await redis.get<GallerySchemaType[]>(key)
    if (items) return items.filter((item) => isWithinDateRange(item.發布期間))
  }

  const items = await fetchNotionDataAsync<GallerySchemaType>(
    notion,
    {
      ...galleryQuery,
      filter: {
        and: [...galleryFilters, { property: '位置', select: { equals: position } }],
      },
    },
    processGalleryDataAsync,
  )

  await redis.set(key, items)

  return items.filter((item) => isWithinDateRange(item.發布期間))
}

export async function processGalleryDataAsync(item: any): Promise<GallerySchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: GallerySchemaType = GallerySchema.parse(item.properties)
  parseItem.圖片_PC = mapImgUrl(parseItem.圖片_PC, item.id)
  parseItem.圖片_M = mapImgUrl(parseItem.圖片_M, item.id)

  return parseItem
}
