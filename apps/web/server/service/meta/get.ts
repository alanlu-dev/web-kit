import { type Client, isFullPage } from '@notionhq/client'
import type { MetaSchemaType } from '~/schema/meta'
import { MetaSchema, metaFilters, metaKey, metaQuery } from '~/schema/meta'

export async function getMetaByPathAsync(notion: Client | null, fullPath: string, refresh: boolean): Promise<MetaSchemaType | null> {
  if (!fullPath) return null

  fullPath = `/${fullPath === 'index' ? '' : fullPath}`
  const key = `${metaKey}:${fullPath}`

  let items: MetaSchemaType[] | null = null

  if (!refresh) {
    items = await redis.get<MetaSchemaType[]>(key)
  }

  console.log(fullPath)
  if (items === null) {
    items = await fetchNotionDataAsync<MetaSchemaType>(
      notion,
      {
        ...metaQuery,
        filter: {
          and: [...metaFilters, { property: 'fullPath', formula: { string: { equals: fullPath } } }],
        },
      },
      processMetaDataAsync,
    )
    if (items) await redis.set(key, items)
  }

  return items.filter((item) => isWithinDateRange(item.發布期間))[0]
}

export async function processMetaDataAsync(_: Client | null, item: any): Promise<MetaSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: MetaSchemaType = MetaSchema.parse(item.properties)
  parseItem.圖片 = mapImgUrl(parseItem.圖片, item.id)

  return parseItem
}
