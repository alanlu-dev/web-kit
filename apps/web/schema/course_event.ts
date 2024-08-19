import { z } from 'zod'
import { NotionDatabaseRollupSchema, NotionDateSchema, NotionFormulaSchema, NotionNumberSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'
import { format } from '@formkit/tempo'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { ClassroomSchema } from './classroom.js'

export const CourseEventSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  編號: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),

  上課日期: NotionDateSchema.transform((o) => {
    if (!o.date) return null
    const startDate = new Date(o.date.start)
    const endDate = o.date.end ? new Date(o.date.end) : null

    const formattedDate = format({ date: startDate, format: 'YYYY/MM/DD (d)', locale: 'zh-TW', tz: 'Asia/Taipei' })
    const startTime = format({ date: startDate, format: 'HH:mm', locale: 'zh-TW', tz: 'Asia/Taipei' })
    const endTime = endDate ? format({ date: endDate, format: 'HH:mm', locale: 'zh-TW', tz: 'Asia/Taipei' }) : null

    const formattedTime = endTime ? `${startTime}~${endTime}` : startTime

    return [formattedDate, formattedTime, o.date.start]
  }),

  課程ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),
  課程資訊_名稱: z.string().optional(),
  課程資訊_價格: z.number().optional().nullable(),
  指定價格: NotionNumberSchema.transform((o) => o.number),

  教室ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),
  教室資訊: ClassroomSchema.optional().nullable(),
  指定名額限制: NotionNumberSchema.transform((o) => o.number),

  講師ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),

  報名人數: NotionFormulaSchema.transform((o) => (o.formula.type === 'number' ? o.formula.number : undefined)),
  已完課: NotionFormulaSchema.transform((o) => (o.formula.type === 'boolean' ? o.formula.boolean : undefined)),

  // 封存: NotionCheckboxSchema.transform((o) => o.checkbox),
  // 發布狀態: NotionStatusSchema.transform((o) => o.status),
})
export type CourseEventSchemaType = z.infer<typeof CourseEventSchema>

const config = useRuntimeConfig()

export const courseEventKey = 'course_events'
export const courseEventFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '課程驗證', formula: { string: { equals: '✅' } } },
  { property: '講師驗證', formula: { string: { equals: '✅' } } },
  { property: '教室驗證', formula: { string: { equals: '✅' } } },
]
export const courseEventQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.courseEvents,
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
    /** 課程ID */
    '%60Nff',
    /** 指定價格 */
    'KSzP',

    /** 教室ID */
    'jaSZ',
    /** 指定名額限制 */
    'MZlx',

    /** 講師ID */
    'hX%3DC',

    /** 報名人數 */
    'uuzW',
    /** 已完課 */
    '_F%7B%3A',

    /** 封存 */
    // 'rh%7CP',
    /** 發布狀態 */
    // 'C%5B%40Y',
  ],
}
