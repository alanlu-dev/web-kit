import { z } from 'zod'
import { NotionCheckboxSchema, NotionDateSchema, NotionFilesSchema, NotionFormulaSchema, NotionRichTextSchema, NotionSelectSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const MetaSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  後墜: NotionCheckboxSchema.transform((o) => o.checkbox),
  路由名稱: NotionSelectSchema.transform((o) => o.select?.name),
  正式連結: NotionFormulaSchema.transform((o) => (o.formula.type === 'string' ? o.formula.string : undefined)),
  描述: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  路由ID: NotionFormulaSchema.transform((o) => (o.formula.type === 'string' ? o.formula.string : undefined)),
  圖片: NotionFilesSchema.transform((o) => (o.files[0]?.type === 'file' ? o.files[0].file.url : undefined)),
  發布期間: NotionDateSchema.transform((o) => o.date),
  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
})
export type MetaSchemaType = z.infer<typeof MetaSchema>

const config = useRuntimeConfig()

export const metaKey = 'meta'
export const metaFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const metaQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.meta,
  sorts: [{ property: '發布期間', direction: 'ascending' }],
  filter: { and: metaFilters },
  filter_properties: [
    /** 標題 */
    'title',
    /** 後墜 */
    'Jb%3Bn',
    /** 路由名稱 */
    '%3EXcE',
    /** 正式連結 */
    '%3BdD%3D',
    /** 描述 */
    'wQsN',
    /** 路由ID */
    '%5Dmz%3B',
    /** 圖片 */
    'c%3E%7Cc',
    /** 發布期間 */
    '%5CAvJ',

    /** 課程ID */
    // 'dQnB',
    /** fullPath */
    // 'eBq%5E',

    /** 封存 */
    // 'T%3B%3BB',
  ],
}
