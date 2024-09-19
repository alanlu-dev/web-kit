import { type Client, isFullPage } from '@notionhq/client'
import type { OrderSchemaType } from '~/schema/order'
import { orderFilters, orderQuery, OrderSchema } from '~/schema/order'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'

export async function getOrderByIdAsync(notion: Client | null, id: number): Promise<OrderSchemaType | null> {
  if (!id) return null

  const [item] = await fetchNotionDataByIdAsync<OrderSchemaType>({
    notion,
    query: orderQuery,
    filters: orderFilters,
    processData: processOrderDataAsync,
    updateProperties: null,
    id,
  })

  return item
}

export async function getOrderByTransNoAsync(notion: Client | null, trans_no: string): Promise<OrderSchemaType | null> {
  const [items] = await fetchNotionDataAsync<OrderSchemaType>({
    notion,
    query: {
      ...orderQuery,
      filter: {
        and: [
          ...orderFilters,
          // 訂單編號
          { property: '訂單編號', title: { equals: trans_no } },
          // 是否逾期
          { property: '是否逾期', formula: { checkbox: { equals: false } } },
        ],
      },
    },
    processData: processOrderDataAsync,
    updateProperties: null,
  })

  return items ? items[0] : null
}

export async function getOrderByMemberIdAsync(notion: Client | null, coursePageId: string, memberPageId: string): Promise<OrderSchemaType | null> {
  console.log('getOrderByMemberIdAsync', coursePageId, memberPageId)
  const [items] = await fetchNotionDataAsync<OrderSchemaType>({
    notion,
    query: {
      ...orderQuery,
      filter: {
        and: [
          ...orderFilters,
          // 課程場次
          { property: '課程場次', relation: { contains: coursePageId } },
          // 會員
          { property: '會員', relation: { contains: memberPageId } },
          // 是否逾期
          { property: '是否逾期', formula: { checkbox: { equals: false } } },
        ],
      },
    },
    processData: processOrderDataAsync,
    updateProperties: null,
  })

  return items ? items[0] : null
}

export async function processOrderDataAsync(notion: Client, item: any): Promise<OrderSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: OrderSchemaType = OrderSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  if (parseItem.課程場次ID) parseItem.課程場次資訊 = await getCourseEventByIdAsync(notion, parseItem.課程場次ID, false)

  return parseItem
}
