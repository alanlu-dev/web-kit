import { z } from 'zod'
import {
  NotionDatabaseCheckboxSchema,
  NotionDatabaseFilesSchema,
  NotionDatabaseFormulaSchema,
  NotionDatabaseNumberSchema,
  NotionDatabaseSelectSchema,
  NotionDatabaseStatusSchema,
  NotionDatabaseTitleSchema,
  NotionDatabaseUrlSchema,
} from '@jiehousekeeper/notion-api-zod-schema'

export const GallerySchema = z.object({
  位置: NotionDatabaseSelectSchema.transform((o) => o.select.name),
  排序: NotionDatabaseNumberSchema.transform((o) => o.number),
  標題: NotionDatabaseTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  圖片: NotionDatabaseFilesSchema.transform((o) => (o.files[0]?.type === 'file' ? o.files[0].file.url : undefined)),
  導轉連結: NotionDatabaseUrlSchema.transform((o) => o.url),
  // 發布期間: NotionDatabaseDateSchema.transform((o) => o.date),
  資料驗證: NotionDatabaseFormulaSchema.transform((o) => (o.formula.type === 'string' ? o.formula.string : undefined)),
  發布狀態: NotionDatabaseStatusSchema.transform((o) => o.status.name),
  封存: NotionDatabaseCheckboxSchema.transform((o) => o.checkbox),
})

export type GallerySchemaType = z.infer<typeof GallerySchema>
