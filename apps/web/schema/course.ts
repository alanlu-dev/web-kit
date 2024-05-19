import { z } from 'zod'
import { NotionFilesSchema, NotionNumberSchema, NotionRelationSchema, NotionSelectSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'

export const CourseSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  課程名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  講師資訊: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  課程照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  標籤: NotionSelectSchema.transform((o) => o.select?.name),
  價格: NotionNumberSchema.transform((o) => o.number),
})

export type CourseSchemaType = z.infer<typeof CourseSchema>
