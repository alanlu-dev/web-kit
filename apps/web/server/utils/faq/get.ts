import { type Client, isFullPage } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { FaqSchemaType } from '~/schema/faq'
import { FaqSchema, faqKey, faqQuery } from '~/schema/faq'

export async function getFaqAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<FaqSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheAsync<FaqSchemaType>(faqKey, currentPage, pageSize)
    if (items !== null) return items
  }

  const items = await fetchNotionDataAsync<FaqSchemaType>(notion, { ...faqQuery, page_size: pageSize }, processFaqDataAsync)

  await kv.del(faqKey)
  await kv.rpush(faqKey, ...items)

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return pageData
}

export async function processFaqDataAsync(item: any): Promise<FaqSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: FaqSchemaType = FaqSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  return parseItem
}
