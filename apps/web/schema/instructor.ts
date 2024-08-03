import { z } from 'zod'
import {
  NotionFilesSchema,
  NotionFormulaSchema,
  NotionNumberSchema,
  NotionRelationSchema,
  NotionRichTextSchema,
  NotionSelectSchema,
  NotionTitleSchema,
  NotionUniqueIdSchema,
} from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { AndFilterType } from '~/types/notion'

export const CertificationSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  專業認證: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})
export type CertificationSchemaType = z.infer<typeof CertificationSchema>

export const InvitedLectureSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  受邀講座: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})
export type InvitedLectureSchemaType = z.infer<typeof InvitedLectureSchema>

export const InstructorSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  英文名: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  頭銜: NotionSelectSchema.transform((o) => o.select?.name),
  標語: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  服務經驗: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  工作經驗: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  教學經驗: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  專業認證: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  專業認證資訊: z.array(CertificationSchema.optional()).optional(),
  受邀講座: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  受邀講座資訊: z.array(InvitedLectureSchema.optional()).optional(),
})
export type InstructorSchemaType = z.infer<typeof InstructorSchema>

export const instructorKey = 'instructors'
export const instructorFilters: AndFilterType = [
  // { property: '封存', checkbox: { equals: false } },
  // { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const instructorQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_INSTRUCTORS!,
  sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: instructorFilters },
  filter_properties: [
    /** ID */
    '%7DaOz',
    /** 名稱 */
    'title',
    /** 排序 */
    'KfPc',
    /** 英文名 */
    'bQo%5D',
    /** 照片 */
    'ayLr',
    /** 頭銜 */
    'vms%7D',
    /** 標語 */
    'PnrO',
    /** 服務經驗 */
    'ySk%7B',
    /** 工作經驗 */
    'l%7Bbz',
    /** 教學經驗 */
    'O%60rl',
    /** 專業認證 */
    '~dx%3B',
    /** 受邀講座 */
    'UxQF',
  ],
}
