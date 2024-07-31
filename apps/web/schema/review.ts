import { z } from 'zod'
import { NotionDatabaseRollupSchema, NotionDateSchema, NotionFilesSchema, NotionRelationSchema, NotionRichTextSchema, NotionTitleSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'

export const ReviewSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  發布日期: NotionDateSchema.transform((o) => o.date?.start),
  學員: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  課程: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  課程名稱: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined,
  ),
  評價: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  影音連結: NotionUrlSchema.transform((o) => (o.url ? o.url : undefined)),
})

export type ReviewSchemaType = z.infer<typeof ReviewSchema>
