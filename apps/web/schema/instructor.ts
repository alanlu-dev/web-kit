import { z } from 'zod'
import { NotionFilesSchema, NotionFormulaSchema, NotionNumberSchema, NotionRichTextSchema, NotionSelectSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const InstructorSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  英文名: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  頭銜: NotionSelectSchema.transform((o) => o.select?.name),

  標語: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  工作經驗: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  教學經驗: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),

  專業認證: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  受邀講座: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  服務經驗: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
})
export type InstructorSchemaType = z.infer<typeof InstructorSchema>

const config = useRuntimeConfig()

export const instructorKey = 'instructors'
export const instructorFilters: AndFilterType = [
  // { property: '封存', checkbox: { equals: false } },
  // { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const instructorQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.instructors,
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
    /** 工作經驗 */
    'l%7Bbz',
    /** 教學經驗 */
    'O%60rl',
    /** 專業認證 */
    'rZ%3Fk',
    /** 受邀講座 */
    'YVRm',
    /** 服務經驗 */
    'ySk%7B',
  ],
}
