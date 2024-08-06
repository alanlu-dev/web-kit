import { z } from 'zod'
import {
  NotionDatabaseRollupSchema,
  NotionNumberSchema,
  NotionRelationSchema,
  NotionRichTextSchema,
  NotionStatusSchema,
  NotionTitleSchema,
  NotionUniqueIdSchema,
} from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { MemberSchema } from './member'
import { CourseEventSchema } from './course_event'
import type { AndFilterType } from '~/types/notion'

export const OrderParamsSchema = MemberSchema.extend({
  courseEventId: z.number(),
})
export type OrderParamsSchemaType = z.infer<typeof OrderParamsSchema>

export const OrderSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  訂單編號: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  留言備註: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),

  // 會員: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  會員ID: NotionDatabaseRollupSchema.transform(
    (o) => o.rollup.type === 'array' && (o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined),
  ),

  // 課程安排: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  課程安排ID: NotionDatabaseRollupSchema.transform(
    (o) => o.rollup.type === 'array' && (o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined),
  ),
  課程安排: CourseEventSchema.optional().nullable(),

  付款金額: NotionNumberSchema.transform((o) => o.number),

  付款狀態: NotionStatusSchema.transform((o) => o.status.name),
  聯絡狀態: NotionStatusSchema.transform((o) => o.status.name),
})
export type OrderSchemaType = z.infer<typeof OrderSchema>

export const orderFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  // { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const orderQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_ORDERS!,
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
    /** 課程安排 */
    // 'UYf%3A',
    /** 課程安排ID */
    '%3DFp%5E',
    /** 留言備註 */
    'huBu',
    /** 付款金額 */
    'LXf%5E',
    /** 付款狀態 */
    'ayf%5B',
    /** 聯絡狀態 */
    'Ti%5DJ',
  ],
}
