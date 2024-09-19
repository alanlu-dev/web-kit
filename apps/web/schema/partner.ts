import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { NotionFilesSchema, NotionRichTextSchema, NotionTitleSchema, NotionUniqueIdSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'
import { z } from 'zod'

export const PartnerSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  介紹: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  圖片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  圖片alt: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  連結: NotionUrlSchema.transform((o) => o.url),
})
export type PartnerSchemaType = z.infer<typeof PartnerSchema>

const config = useRuntimeConfig()

export const partnerKey = `partners`
export const partnerFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const partnerQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.partners,
  sorts: [{ property: '排序', direction: 'ascending' }],
  filter: { and: partnerFilters },
  filter_properties: [
    /** ID */
    'AUl%3E',
    /** 名稱 */
    'title',
    /** 介紹 */
    'Mrtq',
    /** 圖片 */
    'z%7D%5CN',
    /** 圖片alt */
    'JzX_',
    /** 連結 */
    '%3DZ%3ER',

    /** 封存 */
    // '%7BPFJ'
  ],
}
