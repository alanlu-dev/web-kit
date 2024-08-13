import { z } from 'zod'
import { NotionFilesSchema, NotionRichTextSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const PartnerSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  介紹: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  圖片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
})
export type PartnerSchemaType = z.infer<typeof PartnerSchema>

const config = useRuntimeConfig()

export const partnerKey = `partners`
export const partnerFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  // { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  // { property: '發布日期', date: { on_or_before: new Date().toISOString() } },
]
export const partnerQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.partners,
  sorts: [{ property: '排序', direction: 'ascending' }],
  filter: { and: partnerFilters },
  // filter_properties: [],
}
