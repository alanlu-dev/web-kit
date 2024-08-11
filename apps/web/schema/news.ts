import { z } from 'zod'
import { NotionDateSchema, NotionRichTextSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { AndFilterType } from '~/types/notion'

export const NewsSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  內容: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  發布日期: NotionDateSchema.transform((o) => o.date?.start),

  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
})
export type NewsSchemaType = z.infer<typeof NewsSchema>

export const newsKey = 'news'
export const newsFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const newsQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_NEWS!,
  sorts: [{ property: '發布日期', direction: 'descending' }],
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

    /** 封存 */
    // '%3E%3Ed%7C',
    /** 發布狀態 */
    // 'C~%3Ac',
  ],
}
