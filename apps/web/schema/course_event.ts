import { z } from 'zod'
import { NotionDatabaseRollupSchema, NotionDateSchema, NotionNumberSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { CourseSchema } from './course'
import { ClassroomSchema } from './classroom.js'
import type { AndFilterType } from '~/types/notion'

export const CourseEventSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  編號: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),

  上課日期: NotionDateSchema.transform((o) => {
    if (!o.date) return null
    const startDate = new Date(o.date.start)
    const endDate = o.date.end ? new Date(o.date.end) : null

    const formattedDate = `${startDate
      .toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      })
      .replace('週', '')}`

    const startTime = startDate.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const endTime = endDate ? endDate.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }) : null

    const formattedTime = endTime ? `${startTime}~${endTime}` : startTime

    return [formattedDate, formattedTime]
  }),
  // 課程: NotionRelationSchema.transform((o) => o.relation[0]?.id),
  課程ID: NotionDatabaseRollupSchema.transform(
    (o) => o.rollup.type === 'array' && (o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined),
  ),
  課程: CourseSchema.optional().nullable(),
  // 課程標題: NotionDatabaseRollupSchema.transform((o) =>
  //   o.rollup.type === 'array' && o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined,
  // ),
  // 課程標籤: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'array' && o.rollup.array[0]?.type === 'select' ? o.rollup.array[0].select?.name : undefined)),
  // 課程摘要: NotionFormulaSchema.transform((o) => (o.formula.type === 'string' ? o.formula.string : undefined)),
  // 課程圖片連結: z.string().optional(),

  指定價格: NotionNumberSchema.transform((o) => o.number),
  // 最終價格: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),

  教室ID: NotionDatabaseRollupSchema.transform(
    (o) => o.rollup.type === 'array' && (o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined),
  ),
  教室: ClassroomSchema.optional().nullable(),
  // 教室名稱: NotionDatabaseRollupSchema.transform(
  //   (o) => o.rollup.type === 'array' && (o.rollup.array[0]?.type === 'title' && o.rollup.array[0].title[0]?.type === 'text' ? o.rollup.array[0].title[0].plain_text : undefined),
  // ),
  // 教室地址: NotionDatabaseRollupSchema.transform((o) =>
  //   o.rollup.type === 'array' && o.rollup.array[0]?.type === 'rich_text' && o.rollup.array[0].rich_text[0]?.type === 'text' ? o.rollup.array[0].rich_text[0].plain_text : undefined,
  // ),

  名額限制: NotionNumberSchema.transform((o) => o.number),
  // 報名人數: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'number' && o.rollup.number ? o.rollup.number : undefined)),

  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
})
export type CourseEventSchemaType = z.infer<typeof CourseEventSchema>

export const courseEventKey = 'course_events'
export const courseEventFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '課程驗證', formula: { string: { equals: '✅' } } },
]
export const courseEventQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_COURSE_EVENTS!,
  sorts: [{ property: '上課日期', direction: 'descending' }],
  filter: {
    and: courseEventFilters,
  },
  filter_properties: [
    /** ID */
    'Axt%3D',
    /** 編號 */
    'title',
    /** 上課日期 */
    '%7D%3EfP',
    /** 課程 */
    // 'k_%5Ev',
    /** 課程ID */
    '%60Nff',
    /** 課程標題 */
    // '%5BYP%5B',
    /** 課程標籤 */
    // 'ZBzH',
    /** 課程摘要 */
    // 'ofgL',
    /** 指定價格 */
    'KSzP',
    /** 最終價格 */
    // 'KF%3FY',
    /** 教室 */
    // 'A%5EKK',
    /** 教室ID */
    'jaSZ',
    /** 教室名稱 */
    // 'Azcq',
    /** 教室地址 */
    // '~~VH',
    /** 名額限制 */
    'MZlx',
    /** 報名人數 */
    // 'uuzW',
  ],
}
