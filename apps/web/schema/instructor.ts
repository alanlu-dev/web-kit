import { z } from 'zod'
import { NotionFilesSchema, NotionFormulaSchema, NotionNumberSchema, NotionRelationSchema, NotionRichTextSchema, NotionSelectSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'

export const CertificationSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  排序: NotionNumberSchema.transform((o) => o.number),
  專業認證: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})
export const InvitedLectureSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  排序: NotionNumberSchema.transform((o) => o.number),
  受邀講座: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})

export const InstructorSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  排序: NotionNumberSchema.transform((o) => o.number),
  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  英文名: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  頭銜: NotionSelectSchema.transform((o) => o.select?.name),
  標語: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  服務經驗: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text : undefined)),
  工作經驗: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  教學經驗: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  專業認證: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  專業認證資訊: z.array(CertificationSchema.optional()).optional(),
  受邀講座: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  受邀講座資訊: z.array(InvitedLectureSchema.optional()).optional(),
})

export type CertificationSchemaType = z.infer<typeof CertificationSchema>
export type InvitedLectureSchemaType = z.infer<typeof InvitedLectureSchema>
export type InstructorSchemaType = z.infer<typeof InstructorSchema>
