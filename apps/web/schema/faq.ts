import { z } from 'zod'
import { NotionNumberSchema, NotionRichTextSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'

export const FaqSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  排序: NotionNumberSchema.transform((o) => o.number),
  問題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  答案: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
})

export type FaqSchemaType = z.infer<typeof FaqSchema>
