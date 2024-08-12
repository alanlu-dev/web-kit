import { z } from 'zod'
import { NotionCheckboxSchema, NotionDateSchema, NotionFilesSchema, NotionTitleSchema, NotionUrlSchema } from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export const GallerySchema = z.object({
  // 位置: NotionSelectSchema.transform((o) => o.select?.name),
  // 排序: NotionNumberSchema.transform((o) => o.number),
  標題: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  圖片_PC: NotionFilesSchema.transform((o) => (o.files[0]?.type === 'file' ? o.files[0].file.url : undefined)),
  圖片_M: NotionFilesSchema.transform((o) => (o.files[0]?.type === 'file' ? o.files[0].file.url : undefined)),
  導轉連結: NotionUrlSchema.transform((o) => o.url),
  另開視窗: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
  發布期間: NotionDateSchema.transform((o) => o.date),
  // 資料驗證: NotionFormulaSchema.transform((o) => (o.formula.type === 'string' ? o.formula.string : undefined)),
  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
})
export type GallerySchemaType = z.infer<typeof GallerySchema>

const runtimeConfig = useRuntimeConfig()

export const galleryKey = 'gallery'
export const galleryFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !runtimeConfig.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const galleryQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_GALLERIES!,
  sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: galleryFilters },
  filter_properties: [
    /** 標題 */
    'title',
    /** 圖片_PC */
    'x%60DM',
    /** 圖片_M */
    'yjny',
    /** 導轉連結 */
    'f%3Eo%60',
    /** 另開視窗 */
    'K%5CmR',
    /** 發布期間 */
    'X%5DbD',
  ],
}
