import { z } from 'zod'
import { NotionDatabaseRollupSchema, NotionDateSchema, NotionFormulaSchema, NotionRelationSchema, NotionTitleSchema } from '@alanlu-dev/notion-api-zod-schema'

export const CourseEventSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id),
  ID: z.string().optional(),
  編號: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
  上課日期: NotionDateSchema.transform((o) => {
    if (!o.date) return null
    const startDate = o.date.start.replace(/-/g, '/')
    const endDate = o.date.end ? o.date.end.replace(/-/g, '/') : null

    return {
      start: startDate,
      end: endDate,
    }
  }),
  課程: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  課程標題: NotionDatabaseRollupSchema.transform((o) => (o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined)),
  課程標籤: NotionDatabaseRollupSchema.transform((o) => (o.rollup.array[0]?.type === 'select' ? o.rollup.array[0].select?.name : undefined)),
  課程圖片連結: z.string().optional(),
  最終價格: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  教室名稱: NotionDatabaseRollupSchema.transform((o) => (o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined)),
  教室地址: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.array[0]?.type === 'rich_text' && o.rollup.array[0].rich_text[0]?.type === 'text' ? o.rollup.array[0].rich_text[0].plain_text : undefined,
  ),
  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
})

export type CourseEventSchemaType = z.infer<typeof CourseEventSchema>
