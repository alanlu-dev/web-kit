import { type Client, isFullPage } from '@notionhq/client'
import type { OrderSchemaType } from '~/schema/order'
import { OrderSchema, orderFilters, orderQuery } from '~/schema/order'

export async function getOrderByIdAsync(notion: Client | null, id: number): Promise<OrderSchemaType | null> {
  if (!id) return null

  const item = await fetchNotionDataByIdAsync<OrderSchemaType>(notion, orderQuery, orderFilters, id, processOrderDataAsync)

  return item
}

export async function getOrderByTransNoAsync(notion: Client | null, trans_no: string): Promise<OrderSchemaType | null> {
  const items = await fetchNotionDataAsync<OrderSchemaType>(
    notion,
    {
      ...orderQuery,
      filter: {
        and: [...orderFilters, { property: '訂單編號', title: { equals: trans_no } }],
      },
    },
    processOrderDataAsync,
  )

  return items ? items[0] : null
}

export async function processOrderDataAsync(notion: Client | null, item: any): Promise<OrderSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: OrderSchemaType = OrderSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  if (parseItem.課程安排ID) parseItem.課程安排資訊 = await getCourseEventByIdAsync(notion, parseItem.課程安排ID, false)

  return parseItem
}
