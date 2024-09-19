import { type Client, isFullPage } from '@notionhq/client'
import type { PartnerSchemaType } from '~/schema/partner'
import { partnerFilters, partnerKey, partnerQuery, PartnerSchema } from '~/schema/partner'

export async function getPartnerByIdAsync(notion: Client | null, id: number, refresh: boolean): Promise<PartnerSchemaType | null> {
  if (!id) return null

  const key = `${partnerKey}:${id}`

  let item: PartnerSchemaType | null = null

  if (!refresh) {
    item = await redis.get<PartnerSchemaType>(key)
  }

  if (!item) {
    ;[item] = await fetchNotionDataByIdAsync<PartnerSchemaType>({
      notion,
      query: partnerQuery,
      processData: processPartnerDataAsync,
      updateProperties: updateRefreshTime,
      filters: partnerFilters,
      id,
    })
    if (item) await redis.set(key, item)
  }

  return item
}

export async function getPartnersAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<PartnerSchemaType[]> {
  let items: PartnerSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<PartnerSchemaType>(partnerKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<PartnerSchemaType>({
      notion,
      query: { ...partnerQuery, page_size: pageSize },
      processData: processPartnerDataAsync,
      updateProperties: updateRefreshTime,
    })

    if (items.length) {
      await redis.del(partnerKey)
      items.map(async (item) => {
        await redis.rPush(partnerKey, item.ID)
        await redis.set(`${partnerKey}:${item.ID}`, item)
      })
      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  return items
}

export async function processPartnerDataAsync(_: Client, item: any): Promise<PartnerSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: PartnerSchemaType = PartnerSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')
  parseItem.圖片 = parseItem.圖片.map((img) => mapImgUrl(img, item.id))

  return parseItem
}
