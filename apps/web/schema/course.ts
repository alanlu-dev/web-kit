import { z } from 'zod'
import {
  NotionDatabaseRollupSchema,
  NotionFilesSchema,
  NotionNumberSchema,
  NotionRelationSchema,
  NotionSelectSchema,
  NotionTitleSchema,
  NotionUniqueIdSchema,
  NotionUrlSchema,
} from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { InstructorSchema } from './instructor'
import type { AndFilterType } from '~/types/notion'

// 課程特色
export const FeaturesSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  課程特色: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})

// 可以學到
export const LearnSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  可以學到: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})

// 課程大綱
export const OutlineSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  課程大綱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  時長: NotionNumberSchema.transform((o) => o.number),
})

// 課前準備
export const PreparationSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  課前準備: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})

// 結業獲得
export const AchievementSchema = z.object({
  // ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  結業獲得: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
})

export const CourseSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  課程名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  標籤: NotionSelectSchema.transform((o) => o.select?.name),
  課程照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  影音連結: NotionUrlSchema.transform((o) => (o.url ? o.url : undefined)),
  價格: NotionNumberSchema.transform((o) => o.number),
  單元數: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'array' && o.rollup.array[0]?.type === 'number' && o.rollup.array[0].number ? o.rollup.array[0].number : undefined)),
  課程時長: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'array' && o.rollup.array[0]?.type === 'number' && o.rollup.array[0].number ? o.rollup.array[0].number : undefined)),
  結業人數: NotionDatabaseRollupSchema.transform((o) => (o.rollup.type === 'array' && o.rollup.array[0]?.type === 'number' && o.rollup.array[0].number ? o.rollup.array[0].number : undefined)),

  講師: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  講師ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type !== 'array' ? [] : o.rollup.array.map((item) => (item?.type === 'unique_id' && item.unique_id ? item.unique_id.number : undefined)).filter((id): id is number => id !== undefined),
  ),
  講師資訊: z.array(InstructorSchema.optional()).optional(),

  課程安排: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  學員評價: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),

  課程特色: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  可以學到: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  課程大綱: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  課前準備: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  結業獲得: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  課程特色資訊: z.array(FeaturesSchema.optional()).optional(),
  可以學到資訊: z.array(LearnSchema.optional()).optional(),
  課程大綱資訊: z.array(OutlineSchema.optional()).optional(),
  課前準備資訊: z.array(PreparationSchema.optional()).optional(),
  結業獲得資訊: z.array(AchievementSchema.optional()).optional(),
})
export type CourseSchemaType = z.infer<typeof CourseSchema>

export const courseKey = 'courses'
export const courseFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
]
export const courseQuery: QueryDatabaseParameters = {
  database_id: process.env.NOTION_DATABASE_ID_COURSES!,
  sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: courseFilters },
  filter_properties: [
    /** ID */
    'gI%7C%3D',
    /** 排序 */
    '%3DZD%5B',
    /** 課程名稱 */
    'title',
    /** 標籤 */
    'tQU%7C',
    /** 課程照片 */
    'r%3ENY',
    /** 影音連結 */
    'dB~z',
    /** 價格 */
    'zWJ%7D',
    /** 單元數 */
    'sRKp',
    /** 課程時長 */
    'lnDC',
    /** 結業人數 */
    'eJ%7Cg',
    /** 講師 */
    '%5CjaO',
    /** 講師ID */
    '%5DjEY',
    /** 課程安排 */
    'VS%7CO',
    /** 學員評價 */
    '%5E%7CLt',
    /** 課程特色 */
    'upg%60',
    /** 可以學到 */
    '_neS',
    /** 課程大綱 */
    '%3DBjz',
    /** 課前準備 */
    'hI_D',
    /** 結業獲得 */
    'p%3CWn',
  ],
}
