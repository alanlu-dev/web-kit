import { z } from 'zod'
import {
  NotionDatabaseRollupSchema,
  NotionFilesSchema,
  NotionNumberSchema,
  NotionRichTextSchema,
  NotionStatusSchema,
  NotionTitleSchema,
  NotionUniqueIdSchema,
  NotionUrlSchema,
} from '@alanlu-dev/notion-api-zod-schema'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { InstructorSchema } from './instructor'
import { CourseEventSchema } from './course_event'
import { CourseBaseSchema } from './course_base'

const gallerySchema = z.object({
  image: z.string().optional(),
  video: z.string().optional(),
  alt: z.string().optional(),
})

export const CourseSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  排序: NotionNumberSchema.transform((o) => o.number),
  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),

  // 課程基礎: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  課程基礎ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type === 'array' && o.rollup.array[0]?.type === 'unique_id' && o.rollup.array[0].unique_id ? o.rollup.array[0].unique_id.number : undefined,
  ),
  課程型態: NotionStatusSchema.transform((o) => o.status.name),
  課程基礎資訊: CourseBaseSchema.optional(),

  課程照片: NotionFilesSchema.transform((o) => o.files.map((file) => (file?.type === 'file' ? file.file.url : undefined)).filter(Boolean)),
  照片alt: NotionRichTextSchema.transform((o) => (o.rich_text[0]?.type === 'text' ? o.rich_text[0].plain_text.split('\n') : [])),
  影音連結: NotionUrlSchema.transform((o) => (o.url ? o.url : undefined)),
  畫廊: z.array(gallerySchema.optional()).optional(),

  價格: NotionNumberSchema.transform((o) => o.number!),

  // 可授課講師: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)),
  可授課講師ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type !== 'array' ? [] : o.rollup.array.map((item) => (item?.type === 'unique_id' && item.unique_id ? item.unique_id.number : undefined)).filter((id): id is number => id !== undefined),
  ),
  可授課講師資訊: z.array(InstructorSchema.optional()).optional(),

  // 課程場次: NotionRelationSchema.transform((o) => o.relation.map((item) => item?.id).filter(Boolean)).optional(),
  課程場次ID: NotionDatabaseRollupSchema.transform((o) =>
    o.rollup.type !== 'array' ? [] : o.rollup.array.map((item) => (item?.type === 'unique_id' && item.unique_id ? item.unique_id.number : undefined)).filter((id): id is number => id !== undefined),
  ),
  課程場次資訊: z.array(CourseEventSchema.optional()).optional(),
})
export type CourseSchemaType = z.infer<typeof CourseSchema>

const config = useRuntimeConfig()

export const courseKey = 'courses'
export const courseFilters: AndFilterType = [
  { property: '封存', checkbox: { equals: false } },
  { property: '發布狀態', status: !config.public.isDev ? { equals: '發布' } : { does_not_equal: '草稿' } },
  { property: '資料驗證', formula: { string: { equals: '✅' } } },
]
export const courseQuery: QueryDatabaseParameters = {
  database_id: config.notion.databaseId.courses,
  sorts: [{ property: '排序', direction: 'descending' }],
  filter: { and: courseFilters },
  filter_properties: [
    /** ID */
    'gI%7C%3D',
    /** 排序 */
    '%3DZD%5B',
    /** 名稱 */
    'title',

    /** 課程基礎 */
    // '%5BG%7DD',
    /** 課程基礎ID */
    '%3FnQq',
    /** 課程型態 */
    'JDEb',

    /** 課程照片 */
    'r%3ENY',
    /** 照片alt */
    'eXGX',
    /** 影音連結 */
    'dB~z',
    /** 價格 */
    'zWJ%7D',

    /** 可授課講師 */
    // '%5CjaO',
    /** 可授課講師ID */
    '%5DjEY',

    /** 課程場次 */
    // 'VS%7CO',
    /** 課程場次ID */
    'p%5C~t',
  ],
}
