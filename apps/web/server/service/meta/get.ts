import { type Client, isFullPage } from '@notionhq/client'
import type { MetaSchemaType } from '~/schema/meta'
import { MetaSchema, metaFilters, metaKey, metaQuery } from '~/schema/meta'

export async function getMetaByPathAsync(notion: Client | null, fullPath: string, refresh: boolean, ssr: boolean): Promise<MetaSchemaType | null> {
  if (!fullPath) return null

  fullPath = `/${fullPath === 'index' ? '' : fullPath}`
  const key = `${metaKey}:${fullPath}`

  let items: MetaSchemaType[] | null = null

  if (!refresh) {
    items = await redis.get<MetaSchemaType[]>(key)
  }

  console.log(fullPath)
  if (items === null) {
    ;[items] = await fetchNotionDataAsync<MetaSchemaType>({
      notion,
      query: {
        ...metaQuery,
        filter: {
          and: [...metaFilters, { property: 'fullPath', formula: { string: { equals: fullPath } } }],
        },
      },
      processData: processMetaDataAsync,
      updateProperties: ssr ? updatePageRefreshTime : updateRefreshTime,
    })
    if (items) await redis.set(key, items)
    // if (items && items[0]?.標題) await redis.set(key, items)
  }

  return items.filter((item) => isWithinDateRange(item.發布期間))[0]
}

export async function getMetaAsync(notion: Client | null, refresh: boolean): Promise<MetaSchemaType[]> {
  let items: MetaSchemaType[] | null = null

  if (!refresh) {
    items = await redis.get<MetaSchemaType[]>(`${metaKey}:*`)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<MetaSchemaType>({
      notion,
      query: metaQuery,
      processData: processMetaDataAsync,
      updateProperties: updateRefreshTime,
    })
    if (items) {
      console.log(items.length)
      const grouped = items.reduce(
        (acc, item) => {
          const category = item.正式連結!
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push(item)
          return acc
        },
        {} as Record<string, MetaSchemaType[]>,
      )
      for (const [fullPath, groupItems] of Object.entries(grouped)) {
        await redis.set(`${metaKey}:${fullPath}`, groupItems)
      }
    }
  }

  return items.filter((item) => isWithinDateRange(item.發布期間))
}

export async function processMetaDataAsync(_: Client, item: any): Promise<MetaSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: MetaSchemaType = MetaSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')
  parseItem.圖片 = mapImgUrl(parseItem.圖片, item.id)

  return parseItem
}
