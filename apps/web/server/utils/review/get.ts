import { type Client, isFullPage } from '@notionhq/client'
import type { ReviewSchemaType } from '~/schema/review'
import { ReviewSchema, reviewFilters, reviewKey, reviewQuery } from '~/schema/review'

export async function getReviewByIdAsync(notion: Client | null, id: number, refresh: boolean): Promise<ReviewSchemaType | null> {
  if (!id) return null

  const key = `${reviewKey}:${id}`

  let item: ReviewSchemaType | null = null

  if (!refresh) {
    item = await redis.get<ReviewSchemaType>(key)
  }

  if (!item) {
    item = await fetchNotionDataByIdAsync<ReviewSchemaType>(notion, reviewQuery, reviewFilters, id, processReviewDataAsync)
    if (item) await redis.set(key, item)
  }

  if (item) {
    item = await processReviewRelationAsync(notion, item)
  }

  return item
}

export async function getReviewsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<ReviewSchemaType[]> {
  let items: ReviewSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<ReviewSchemaType>(reviewKey, currentPage, pageSize)
  }

  if (items === null) {
    items = await fetchNotionDataAsync<ReviewSchemaType>(notion, { ...reviewQuery, page_size: pageSize }, processReviewDataAsync)

    if (items.length) {
      await redis.del(reviewKey)
      items.map(async (item) => {
        await redis.rPush(reviewKey, item.ID)
        await redis.set(`${reviewKey}:${item.ID}`, item)
      })
      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  items = await Promise.all(items.map((item) => processReviewRelationAsync(notion, item)))
  return items
}

export async function processReviewDataAsync(_: Client | null, item: any): Promise<ReviewSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: ReviewSchemaType = ReviewSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')
  parseItem.照片 = parseItem.照片.map((img) => mapImgUrl(img, item.id))

  return parseItem
}

export async function processReviewRelationAsync(notion: Client | null, item: ReviewSchemaType): Promise<ReviewSchemaType> {
  if (item.課程ID) {
    const course = await getCourseByIdAsync(notion, item.課程ID, false, { needCourseEvents: false, needInstructor: false })
    item.課程資訊_名稱 = course?.課程名稱
  }
  return item
}
