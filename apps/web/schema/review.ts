import { z } from 'zod'
import {
  NotionDatabaseRollupSchema,
  NotionDateSchema,
  NotionFilesSchema,
  NotionRelationSchema,
  NotionRichTextSchema,
  NotionTitleSchema,
  NotionUniqueIdSchema,
  NotionUrlSchema,
} from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const ReviewSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  學員: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),

  課程: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  // 課程名稱: NotionDatabaseRollupSchema.transform((o) =>
  //   o.rollup.type === 'array' && o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined,
  // ),
  課程ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),
  // 課程資訊: CourseSchema.optional().nullable(),
  課程資訊_名稱: z.string().optional(),

  評價: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  影音連結: NotionUrlSchema.transform((o) => (o.url ? o.url : undefined)),
  發布日期: NotionDateSchema.transform((o) => o.date?.start),

  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
})
export type ReviewSchemaType = z.infer<typeof ReviewSchema>

const config = useRuntimeConfig()

export const reviewKey = `reviews`
export const reviewFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const reviewQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.reviews,
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
    /** 課程ID */
    'q%7C%40q',
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
