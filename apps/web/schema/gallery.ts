import { z } from 'zod'
import { NotionDateSchema, NotionFilesSchema, NotionTitleSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'

export const GallerySchema = z.object({
  // 位置: NotionSelectSchema.transform((o) => o.select?.name),
  // 排序: NotionNumberSchema.transform((o) => o.number),
  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  圖片_PC: NotionFilesSchema.transform((o) => (o.files[0]?.type === 'file' ? o.files[0].file.url : undefined)),
  圖片_M: NotionFilesSchema.transform((o) => (o.files[0]?.type === 'file' ? o.files[0].file.url : undefined)),
  導轉連結: NotionUrlSchema.transform((o) => o.url),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
  發布期間: NotionDateSchema.transform((o) => o.date),
  // 資料驗證: NotionFormulaSchema.transform((o) => (o.formula.type === 'string' ? o.formula.string : undefined)),
  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
})

export type GallerySchemaType = z.infer<typeof GallerySchema>
