import { z } from 'zod'
import { NotionCheckboxSchema, NotionDateSchema, NotionRichTextSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const NewsSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  內容: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  發布日期: NotionDateSchema.transform((o) => o.date?.start),

  釘選: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
})
export type NewsSchemaType = z.infer<typeof NewsSchema>

const config = useRuntimeConfig()

export const newsKey = 'news'
export const newsFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const newsQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.news,
  sorts: [
    { property: '釘選', direction: 'descending' },
    { property: '發布日期', direction: 'descending' },
  ],
  filter: { and: newsFilters },
  filter_properties: [
    /** ID */
    'q%3C%3CJ',
    /** 標題 */
    'title',
    /** 內容 */
    'F%3BRG',
    /** 發布日期 */
    '%3BqzX',
    /** 釘選 */
    'uJx%5B',

    /** 封存 */
    // '%3E%3Ed%7C',
    /** 發布狀態 */
    // 'C~%3Ac',
  ],
}
