import { z } from 'zod'
import { NotionNumberSchema, NotionRichTextSchema, NotionSelectSchema, NotionTitleSchema, NotionUniqueIdSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

const config = useRuntimeConfig()

export const ClassroomSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  所屬場地: NotionSelectSchema.transform((o) => o.select?.name),
  地址: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  地圖連結: NotionUrlSchema.transform((o) => o.url),
  名額限制: NotionNumberSchema.transform((o) => o.number),
})
export type ClassroomSchemaType = z.infer<typeof ClassroomSchema>

export const classroomKey = 'classrooms'
export const classroomFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const classroomQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.classrooms,
  // sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: classroomFilters },
  filter_properties: [
    /** ID */
    '%3D%5Cvr',
    /** 名稱 */
    'title',
    /** 所屬場地 */
    'GBq%5B',
    /** 地址 */
    'PKIR',
    /** 地圖連結 */
    'vFo%5B',
    /** 名額限制 */
    'v%3FJP',
  ],
}
