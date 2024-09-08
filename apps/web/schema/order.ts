import { z } from 'zod'
import {
  NotionCreatedTimeSchema,
  NotionDatabaseRollupSchema,
  NotionDateSchema,
  NotionFormulaSchema,
  NotionNumberSchema,
  NotionRichTextSchema,
  NotionStatusSchema,
  NotionTitleSchema,
  NotionUniqueIdSchema,
} from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { format } from '@formkit/tempo'
import { MemberSchema } from './member'
import { CourseEventSchema } from './course_event'
import { OrderPaymentMethodEnum } from './payment'

export const OrderParamsSchema = MemberSchema.extend({
  courseEventId: z.number(),
  paymentMethod: OrderPaymentMethodEnum,
})
export type OrderParamsSchemaType = z.infer<typeof OrderParamsSchema>

export const OrderSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  訂單編號: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),

  // 會員: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  會員ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),
  會員名稱: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].text?.content : undefined,
  ),
  會員信箱: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'array' && o.rollup.array[0]?.type === 'email' && o.rollup.array[0].email ? o.rollup.array[0].email : undefined)),

  // 課程場次: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  課程場次ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),
  課程場次資訊: CourseEventSchema.optional().nullable(),

  付款方式: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  金流訊息: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  金流代碼: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  付款金額: NotionNumberSchema.transform((o) => o.number),
  付款日期: NotionDateSchema.transform((o) => {
    if (!o.date) return null
    const startDate = new Date(o.date.start)
    const formattedDate = format({ date: startDate, format: 'YYYY/MM/DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' })

    return formattedDate
  }),
  付款期限: NotionDateSchema.transform((o) => {
    if (!o.date) return null
    const startDate = new Date(o.date.start)
    const formattedDate = format({ date: startDate, format: 'YYYY/MM/DD', locale: 'zh-TW', tz: 'Asia/Taipei' })

    return formattedDate
  }),
  是否逾期: NotionFormulaSchema.transform((o) => (o.formula.type === 'boolean' ? o.formula.boolean : undefined)),
  已作廢: NotionFormulaSchema.transform((o) => (o.formula.type === 'boolean' ? o.formula.boolean : undefined)),
  訂單狀態: NotionStatusSchema.transform((o) => o.status.name),
  聯絡狀態: NotionStatusSchema.transform((o) => o.status.name),

  建立時間: NotionCreatedTimeSchema.transform((o) => {
    return new Date(o.created_time)
  }),
})
export type OrderSchemaType = z.infer<typeof OrderSchema>

const config = useRuntimeConfig()

export const orderFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '已作廢', formula: { checkbox: { equals: false } } },
  // { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const orderQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.orders,
  // sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: orderFilters },
  filter_properties: [
    /** ID */
    'rebb',
    /** 訂單編號 */
    'title',
    /** 會員 */
    // 'j_Pj',
    /** 會員ID */
    'mxR%3F',
    /** 會員名稱 */
    '%5Eyuo',
    /** 會員信箱 */
    '%3E~Wm',
    /** 課程場次 */
    // 'UYf%3A',
    /** 課程場次ID */
    '%3DFp%5E',
    /** 付款方式 */
    '%3FI%7Bq',
    /** 金流訊息 */
    'pRO%5D',
    /** 金流代碼 */
    '%5DtVD',
    /** 付款金額 */
    'LXf%5E',
    /** 付款日期 */
    'An%3CG',
    /** 付款期限 */
    'M%5EmC',
    /** 是否逾期 */
    'Q%40ZY',
    /** 已作廢 */
    'J%3ABd',
    /** 訂單狀態 */
    'ayf%5B',
    /** 聯絡狀態 */
    'Ti%5DJ',
    /** 建立時間 */
    'bkdx',
  ],
}
