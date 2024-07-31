import { z } from 'zod'
import { NotionDateSchema, NotionRichTextSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'

export const NewsSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  內容: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
  發布日期: NotionDateSchema.transform((o) => o.date?.start),
  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
})

export type NewsSchemaType = z.infer<typeof NewsSchema>
