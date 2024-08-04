import { type Client, isFullPage } from '@notionhq/client'
import type { NewsSchemaType } from '~/schema/news'
import { NewsSchema, newsFilters, newsKey, newsQuery } from '~/schema/news'

export async function getNewsByIdAsync(notion: Client | null, id: number, refresh: boolean | undefined = false): Promise<NewsSchemaType | null> {
  if (!id) return null

  const key = `${newsKey}:${id}`

  if (!refresh) {
    const item = await redis.get<NewsSchemaType>(key)

    if (item) {
      console.log('cache hit', key)
      return item
    }
  }

  const item = await fetchNotionDataByIdAsync<NewsSchemaType>(notion, newsQuery, newsFilters, id, processNewsDataAsync)

  if (item) await redis.set(key, item)

  return item
}

export async function getNewsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean | undefined = false): Promise<NewsSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheIdAsync<NewsSchemaType>(newsKey, currentPage, pageSize)
    if (items !== null) return items
  }
  const items = await fetchNotionDataAsync<NewsSchemaType>(notion, { ...newsQuery, page_size: pageSize }, processNewsDataAsync)

  await redis.del(newsKey)
  items.map(async (item) => {
    await redis.rPush(newsKey, item.ID)
    await redis.set(`${newsKey}:${item.ID}`, item)
  })

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return pageData
}

export async function processNewsDataAsync(item: any): Promise<NewsSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: NewsSchemaType = NewsSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')

  return parseItem
}
