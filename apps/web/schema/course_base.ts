import { z } from 'zod'
import { NotionDatabaseRollupSchema, NotionFormulaSchema, NotionNumberSchema, NotionRichTextSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const CourseBaseSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  單元數: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  課程時長: NotionNumberSchema.transform((o) => o.number),
  結業人數: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'number' && o.rollup.number ? o.rollup.number : undefined)),

  課程特色: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  可以學到: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  課程大綱: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  課前準備: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  結業獲得: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
})
export type CourseBaseSchemaType = z.infer<typeof CourseBaseSchema>

const config = useRuntimeConfig()

export const courseBaseKey = 'course_bases'
export const courseBaseFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const courseBaseQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.courseBases,
  // sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: courseBaseFilters },
  filter_properties: [
    /** ID */
    'DEpf',
    /** 名稱 */
    'title',

    /** 單元數 */
    'Kc%3Ba',
    /** 課程時長 */
    'CdSf',
    /** 結業人數 */
    '%5Bd%3Ab',

    /** 課程特色 */
    'xuR%3F',
    /** 可以學到 */
    'OZh%3D',
    /** 課程大綱 */
    'j%5DUX',
    /** 課前準備 */
    '%40%5ERI',
    /** 結業獲得 */
    'v%7BDM',
  ],
}
