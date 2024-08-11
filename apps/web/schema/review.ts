import { z } from 'zod'
import { NotionDateSchema, NotionFilesSchema, NotionRelationSchema, NotionRichTextSchema, NotionTitleSchema, NotionUniqueIdSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { AndFilterType } from '~/types/notion'

export const ReviewSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  學員: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),

  課程: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  // 課程名稱: NotionDatabaseRollupSchema.transform((o) =>
  //   o.rollup.type === 'array' && o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined,
  // ),

  評價: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  影音連結: NotionUrlSchema.transform((o) => (o.url ? o.url : undefined)),
  發布日期: NotionDateSchema.transform((o) => o.date?.start),

  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
})
export type ReviewSchemaType = z.infer<typeof ReviewSchema>

export const reviewKey = `reviews`
export const reviewFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const reviewQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_REVIEWS!,
  sorts: [{ property: '發布日期', direction: 'descending' }],
  filter: { and: reviewFilters },
  filter_properties: [
    /** ID */
    'A%5BIw',
    /** 發布日期 */
    '%3AFip',
    /** 學員 */
    'title',
    /** 課程 */
    'xHXH',
    /** 課程名稱 */
    'Qti%5E',
    /** 評價 */
    'F%3EQ%5D',
    /** 照片 */
    '%3Dyos',
    /** 影音連結 */
    'Qr%3AT',

    /** 封存 */
    // 'CTkS',
    /** 發布狀態 */
    // '7Bns',
  ],
}
