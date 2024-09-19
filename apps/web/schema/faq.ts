import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { NotionNumberSchema, NotionRichTextSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'
import { z } from 'zod'

export const FaqSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),
  排序: NotionNumberSchema.transform((o) => o.number),
  問題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  答案: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
})
export type FaqSchemaType = z.infer<typeof FaqSchema>

const config = useRuntimeConfig()

export const faqKey = 'faq'
export const faqFilters: AndFilterType = [
  // { property: '封存', checkbox: { equals: false } },
  // { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
]
export const faqQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.faq,
  sorts: [{ property: '排序', direction: 'ascending' }],
  filter: { and: faqFilters },
  filter_properties: [
    /** 問題 */
    'title',
    /** 排序 */
    'pOz%60',
    /** 答案 */
    '%60XV%5D',
  ],
}
