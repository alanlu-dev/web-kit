import { type Client, isFullPage } from '@notionhq/client'
import type { FaqSchemaType } from '~/schema/faq'
import { FaqSchema, faqKey, faqQuery } from '~/schema/faq'

export async function getFaqAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<FaqSchemaType[]> {
  let items: FaqSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheAsync<FaqSchemaType>(faqKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<FaqSchemaType>({
      notion,
      query: { ...faqQuery, page_size: pageSize },
      processData: processFaqDataAsync,
      updatePages: updateRefreshTime,
    })

    if (items.length) {
      await redis.del(faqKey)
      await redis.rPush(faqKey, ...items)

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  return items
}

export async function processFaqDataAsync(_: Client, item: any): Promise<FaqSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: FaqSchemaType = FaqSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  return parseItem
}
