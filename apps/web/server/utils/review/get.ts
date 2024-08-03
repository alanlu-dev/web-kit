import { type Client, isFullPage } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { ReviewSchemaType } from '~/schema/review'
import { ReviewSchema, reviewFilters, reviewKey, reviewQuery } from '~/schema/review'

export async function getReviewByIdAsync(notion: Client | null, id: number, refresh: boolean | undefined = false): Promise<ReviewSchemaType | null> {
  if (!id) return null

  const key = `${reviewKey}:${id}`

  if (!refresh) {
    const item = await kv.get<ReviewSchemaType>(key)

    if (item) {
      console.log('cache hit', key)
      return item
    }
  }

  const item = await fetchNotionDataByIdAsync<ReviewSchemaType>(notion, reviewQuery, reviewFilters, id, processReviewDataAsync)

  if (item) await kv.set(key, item)

  return item
}

export async function getReviewsAsync(
  notion: Client | null,
  currentPage: number | undefined = 1,
  pageSize: number | undefined = 10,
  refresh: boolean | undefined = false,
): Promise<ReviewSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheIdAsync<ReviewSchemaType>(reviewKey, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
    if (items !== null) return items
  }
  const items = await fetchNotionDataAsync<ReviewSchemaType>(notion, { ...reviewQuery, page_size: pageSize }, processReviewDataAsync)

  await kv.del(reviewKey)
  items.map(async (item) => {
    await kv.rpush(reviewKey, item.ID)
    await kv.set(`${reviewKey}:${item.ID}`, item)
  })

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return pageData
}

export async function processReviewDataAsync(item: any): Promise<ReviewSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: ReviewSchemaType = ReviewSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')
  parseItem.照片 = parseItem.照片.map((img) => mapImgUrl(img, item.id))

  return parseItem
}
