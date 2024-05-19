import { z } from 'zod'
import { NotionFilesSchema, NotionRichTextSchema, NotionSelectSchema, NotionTitleSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'

export const CaseSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  分類: NotionSelectSchema.transform((o) => o.select?.name),
  封面: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  影音連結: NotionUrlSchema.transform((o) => (o.url ? o.url : undefined)),
  簡介: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
})

export type CaseSchemaType = z.infer<typeof CaseSchema>
