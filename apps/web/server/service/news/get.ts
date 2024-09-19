import { type Client, isFullPage } from '@notionhq/client'
import type { NewsSchemaType } from '~/schema/news'
import { newsFilters, newsKey, newsQuery, NewsSchema } from '~/schema/news'

export async function getNewsByIdAsync(notion: Client | null, id: number, refresh: boolean): Promise<NewsSchemaType | null> {
  if (!id) return null

  const key = `${newsKey}:${id}`

  let item: NewsSchemaType | null = null

  if (!refresh) {
    item = await redis.get<NewsSchemaType>(key)
  }

  if (!item) {
    ;[item] = await fetchNotionDataByIdAsync<NewsSchemaType>({
      notion,
      query: newsQuery,
      processData: processNewsDataAsync,
      updateProperties: updateRefreshTime,
      filters: newsFilters,
      id,
    })
    if (item) await redis.set(key, item)
  }

  return item
}

export async function getNewsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<NewsSchemaType[]> {
  let items: NewsSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<NewsSchemaType>(newsKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<NewsSchemaType>({
      notion,
      query: { ...newsQuery, page_size: pageSize },
      processData: processNewsDataAsync,
      updateProperties: updateRefreshTime,
    })

    if (items.length) {
      await redis.del(newsKey)
      items.map(async (item) => {
        await redis.rPush(newsKey, item.ID)
        await redis.set(`${newsKey}:${item.ID}`, item)
      })

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  return items
}

export async function processNewsDataAsync(_: Client, item: any): Promise<NewsSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: NewsSchemaType = NewsSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')

  return parseItem
}
