import { z } from 'zod'
import { NotionEmojiSchema, NotionTextSchema } from './NotionTextSchema'
import { NotionColorSchema } from './NotionColorSchema'
import { NotionObjectSchema } from './NotionObjectSchema'
import { NotionExternalFileObjectSchema, NotionFileSchema, NotionInternalFileObjectSchema } from './NotionFileSchema'
import { NotionUserSchema } from './NotionUserSchema'
import { NotionTimezoneSchema } from './NotionTimezoneSchema'

export const NotionDatabaseCellSchema = z.object({
  id: z.string(),
  type: z.string(),
})

// title
export const NotionTitleSchema = z.object({
  type: z.literal('title'),
  title: z.array(NotionTextSchema.optional()),
})
export type NotionTitleType = z.infer<typeof NotionTitleSchema>

// rich_text
export const NotionRichTextSchema = z.object({
  type: z.literal('rich_text'),
  rich_text: z.array(NotionTextSchema.optional()),
})
export type NotionRichTextBlockType = z.infer<typeof NotionRichTextSchema>

// number
export const NotionNumberSchema = z.object({
  type: z.literal('number'),
  number: z.number().nullable(),
})
export type NotionNumberType = z.infer<typeof NotionNumberSchema>

export const NotionSelectOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: NotionColorSchema,
})

// select
export const NotionSelectSchema = z.object({
  type: z.literal('select'),
  select: NotionSelectOptionSchema.nullable(),
})
export type NotionSelectType = z.infer<typeof NotionSelectSchema>

// multi_select
export const NotionMultiSelectSchema = z.object({
  type: z.literal('multi_select'),
  multi_select: z.array(NotionSelectOptionSchema.optional()),
})
export type NotionMultiSelectType = z.infer<typeof NotionMultiSelectSchema>

// status
export const NotionStatusSchema = z.object({
  type: z.literal('status'),
  status: z.object({
    id: z.string(),
    name: z.string(),
    color: NotionColorSchema,
  }),
})
export type NotionStatusType = z.infer<typeof NotionStatusSchema>

export const NotionDateItemSchema = z.object({
  start: z.string(),
  end: z.string().nullable(),
  time_zone: NotionTimezoneSchema.nullable(),
})
export type NotionDateItemType = z.infer<typeof NotionDateItemSchema>

// date
export const NotionDateSchema = z.object({
  type: z.literal('date'),
  date: NotionDateItemSchema.nullable(),
})
export type NotionDateType = z.infer<typeof NotionDateSchema>

// people
export const NotionPeopleSchema = z.object({
  type: z.literal('people'),
  people: z.array(NotionUserSchema.optional()),
})
export type NotionPeopleType = z.infer<typeof NotionPeopleSchema>

// files
export const NotionFilesSchema = z.object({
  type: z.literal('files'),
  files: z.array(NotionFileSchema.optional()),
})
export type NotionFilesType = z.infer<typeof NotionFilesSchema>

// checkbox
export const NotionCheckboxSchema = z.object({
  type: z.literal('checkbox'),
  checkbox: z.boolean(),
})
export type NotionCheckboxType = z.infer<typeof NotionCheckboxSchema>

// url
export const NotionUrlSchema = z.object({
  type: z.literal('url'),
  url: z.string().url().nullable(),
})
export type NotionUrlType = z.infer<typeof NotionUrlSchema>

// email
export const NotionEmailSchema = z.object({
  type: z.literal('email'),
  email: z.string().nullable(),
})
export type NotionEmailType = z.infer<typeof NotionEmailSchema>

// phone_number
export const NotionPhoneNumberSchema = z.object({
  type: z.literal('phone_number'),
  phone_number: z.string().nullable(),
})
export type NotionPhoneNumberType = z.infer<typeof NotionPhoneNumberSchema>

// created_time
export const NotionCreatedTimeSchema = z.object({
  type: z.literal('created_time'),
  created_time: z.string(),
})
export type NotionCreatedTimeType = z.infer<typeof NotionCreatedTimeSchema>

// created_by
export const NotionCreatedBySchema = z.object({
  type: z.literal('created_by'),
  created_by: NotionUserSchema,
})
export type NotionCreatedByType = z.infer<typeof NotionCreatedBySchema>

// last_edited_time
export const NotionLastEditedTimeSchema = z.object({
  type: z.literal('last_edited_time'),
  last_edited_time: z.string(),
})
export type NotionLastEditedTimeType = z.infer<typeof NotionLastEditedTimeSchema>

// last_edited_by
export const NotionLastEditedBySchema = z.object({
  type: z.literal('last_edited_by'),
  last_edited_by: NotionUserSchema,
})
export type NotionLastEditedByType = z.infer<typeof NotionLastEditedBySchema>

// unique_id
export const NotionUniqueIdSchema = z.object({
  type: z.literal('unique_id'),
  unique_id: z.object({
    prefix: z.string().nullable(),
    number: z.number(),
  }),
})
export type NotionUniqueIdType = z.infer<typeof NotionUniqueIdSchema>

export const NotionButtonSchema = z.object({
  type: z.literal('button'),
  button: z.object({}),
})
export type NotionButtonType = z.infer<typeof NotionButtonSchema>

// formula
export const NotionFormulaSchema = z.object({
  type: z.literal('formula'),
  formula: z.object({
    type: z.literal('string'),
    string: z.string().nullable(),
  }),
})
export type NotionFormulaType = z.infer<typeof NotionFormulaSchema>

// relation
export const NotionRelationSchema = z.object({
  type: z.literal('relation'),
  relation: z.array(z.object({ id: z.string() }).optional()),
})
export const NotionDatabaseRelationSchema = NotionDatabaseCellSchema.merge(NotionRelationSchema).extend({
  has_more: z.boolean(),
})
export type NotionDatabaseRelationType = z.infer<typeof NotionDatabaseRelationSchema>

// rollup
export const NotionDatabaseRollupSchema = NotionDatabaseCellSchema.extend({
  type: z.literal('rollup'),
  rollup: z.object({
    type: z.literal('array'),
    array: z.array(
      z
        .discriminatedUnion('type', [
          NotionTitleSchema,
          NotionRichTextSchema,
          NotionNumberSchema,
          NotionSelectSchema,
          NotionMultiSelectSchema,
          NotionStatusSchema,
          NotionDateSchema,
          NotionPeopleSchema,
          NotionFilesSchema,
          NotionCheckboxSchema,
          NotionUrlSchema,
          NotionEmailSchema,
          NotionPhoneNumberSchema,
          NotionCreatedTimeSchema,
          NotionCreatedBySchema,
          NotionLastEditedTimeSchema,
          NotionLastEditedBySchema,
          NotionUniqueIdSchema,
          NotionFormulaSchema,
          NotionRelationSchema,
        ])
        .optional(),
    ),
    function: z.enum([
      'average',
      'checked',
      'count_per_group',
      'count',
      'count_values',
      'date_range',
      'earliest_date',
      'empty',
      'latest_date',
      'max',
      'median',
      'min',
      'not_empty',
      'percent_checked',
      'percent_empty',
      'percent_not_empty',
      'percent_per_group',
      'percent_unchecked',
      'range',
      'unchecked',
      'unique',
      'show_original',
      'show_unique',
      'sum',
    ]),
  }),
})
export type NotionDatabaseRollupType = z.infer<typeof NotionDatabaseRollupSchema>

export const NotionDatabasePropertySchema = z.discriminatedUnion('type', [
  NotionDatabaseCellSchema.merge(NotionTitleSchema),
  NotionDatabaseCellSchema.merge(NotionRichTextSchema),
  NotionDatabaseCellSchema.merge(NotionNumberSchema),
  NotionDatabaseCellSchema.merge(NotionSelectSchema),
  NotionDatabaseCellSchema.merge(NotionMultiSelectSchema),
  NotionDatabaseCellSchema.merge(NotionStatusSchema),
  NotionDatabaseCellSchema.merge(NotionDateSchema),
  NotionDatabaseCellSchema.merge(NotionPeopleSchema),
  NotionDatabaseCellSchema.merge(NotionFilesSchema),
  NotionDatabaseCellSchema.merge(NotionCheckboxSchema),
  NotionDatabaseCellSchema.merge(NotionUrlSchema),
  NotionDatabaseCellSchema.merge(NotionEmailSchema),
  NotionDatabaseCellSchema.merge(NotionPhoneNumberSchema),
  NotionDatabaseCellSchema.merge(NotionCreatedTimeSchema),
  NotionDatabaseCellSchema.merge(NotionCreatedBySchema),
  NotionDatabaseCellSchema.merge(NotionLastEditedTimeSchema),
  NotionDatabaseCellSchema.merge(NotionLastEditedBySchema),
  NotionDatabaseCellSchema.merge(NotionUniqueIdSchema),
  NotionDatabaseCellSchema.merge(NotionButtonSchema),
  NotionDatabaseCellSchema.merge(NotionFormulaSchema),
  NotionDatabaseRelationSchema,
  NotionDatabaseRollupSchema,
])
export type NotionDatabasePropertyType = z.infer<typeof NotionDatabasePropertySchema>

export const NotionDatabaseRowSchema = NotionObjectSchema.extend({
  object: z.enum(['database', 'page']),
  icon: z.discriminatedUnion('type', [NotionEmojiSchema, NotionInternalFileObjectSchema, NotionExternalFileObjectSchema]).nullish(),
  cover: NotionFileSchema.nullable(),
  properties: z.record(z.string(), NotionDatabasePropertySchema),
  title: z.array(NotionTextSchema).optional(),
  description: z.array(NotionTextSchema).optional(),
  is_inline: z.boolean().optional(),
})
export type NotionDatabaseRowType = z.infer<typeof NotionDatabaseRowSchema>
