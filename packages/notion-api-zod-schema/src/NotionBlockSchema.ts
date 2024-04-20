import { z } from 'zod'
import { NotionObjectSchema } from './NotionObjectSchema'
import { NotionEmojiSchema, NotionTextSchema } from './NotionTextSchema'
import { NotionExternalFileObjectSchema, NotionFileSchema, NotionInternalFileObjectSchema } from './NotionFileSchema'
import { NotionColorSchema } from './NotionColorSchema'

const NotionBlockBaseSchema = NotionObjectSchema.extend({
  type: z.string(),
  object: z.literal('block'),
})

export const NotionParagraphBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('paragraph'),
  paragraph: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    color: NotionColorSchema,
  }),
})
export type NotionParagraphBlockType = z.infer<typeof NotionParagraphBlockSchema>

export const NotionDividerBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('divider'),
})
export type NotionDividerBlockType = z.infer<typeof NotionDividerBlockSchema>

export const NotionUnsupportedBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('unsupported'),
})
export type NotionUnsupportedBlockType = z.infer<typeof NotionUnsupportedBlockSchema>

export const NotionCalloutBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('callout'),
  callout: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    icon: z.discriminatedUnion('type', [NotionEmojiSchema, NotionInternalFileObjectSchema, NotionExternalFileObjectSchema]).optional(),
    color: NotionColorSchema,
  }),
})
export type NotionCalloutBlockType = z.infer<typeof NotionCalloutBlockSchema>

export const NotionEquationBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('equation'),
  equation: z.object({
    expression: z.string(),
  }),
})
export type NotionEquationBlockType = z.infer<typeof NotionEquationBlockSchema>

export const NotionSyncedBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('synced_block'),
  synced_block: z.object({
    synced_from: z
      .object({
        block_id: z.string(),
      })
      .optional()
      .nullable(),
  }),
})
export type NotionSyncedBlockType = z.infer<typeof NotionSyncedBlockSchema>

export const NotionHeading1BlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('heading_1'),
  heading_1: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    is_toggleable: z.boolean(),
    color: NotionColorSchema,
  }),
})
export type NotionHeading1BlockType = z.infer<typeof NotionHeading1BlockSchema>

export const NotionHeading2BlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('heading_2'),
  heading_2: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    is_toggleable: z.boolean(),
    color: NotionColorSchema,
  }),
})
export type NotionHeading2BlockType = z.infer<typeof NotionHeading2BlockSchema>

export const NotionHeading3BlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('heading_3'),
  heading_3: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    is_toggleable: z.boolean(),
    color: NotionColorSchema,
  }),
})
export type NotionHeading3BlockType = z.infer<typeof NotionHeading3BlockSchema>

export const NotionBulletedListItemBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('bulleted_list_item'),
  bulleted_list_item: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    color: NotionColorSchema,
  }),
})
export type NotionBulletedListItemBlockType = z.infer<typeof NotionBulletedListItemBlockSchema>

export const NotionNumberedListItemBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('numbered_list_item'),
  numbered_list_item: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    color: NotionColorSchema,
  }),
})
export type NotionNumberedListItemBlockType = z.infer<typeof NotionNumberedListItemBlockSchema>

export const NotionToggleBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('toggle'),
  toggle: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    color: NotionColorSchema,
  }),
})
export type NotionToggleBlockType = z.infer<typeof NotionToggleBlockSchema>

export const NotionQuoteBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('quote'),
  quote: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    color: NotionColorSchema,
  }),
})
export type NotionQuoteBlockType = z.infer<typeof NotionQuoteBlockSchema>

export const NotionTodoBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('to_do'),
  to_do: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
    checked: z.boolean(),
    color: NotionColorSchema,
  }),
})
export type NotionTodoBlockType = z.infer<typeof NotionTodoBlockSchema>

export const NotionChildPageBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('child_page'),
  child_page: z.object({
    title: z.string(),
  }),
})
export type NotionChildPageBlockType = z.infer<typeof NotionChildPageBlockSchema>

export const NotionTableBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('table'),
  table: z.object({
    table_width: z.number(),
    has_column_header: z.boolean(),
    has_row_header: z.boolean(),
  }),
})
export type NotionTableBlockType = z.infer<typeof NotionTableBlockSchema>

export const NotionTableOfContentsBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('table_of_contents'),
  table_of_contents: z.object({
    color: NotionColorSchema,
  }),
})
export type NotionTableOfContentsBlockType = z.infer<typeof NotionTableOfContentsBlockSchema>

export const NotionBookmarkBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('bookmark'),
  bookmark: z.object({
    url: z.string(),
    caption: z.array(NotionTextSchema.optional()),
    description: z.array(NotionTextSchema).optional(),
    icon: NotionFileSchema.nullable().optional(),
  }),
})
export type NotionBookmarkBlockType = z.infer<typeof NotionBookmarkBlockSchema>

export const NotionBreadcrumbBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('breadcrumb'),
  breadcrumb: z.object({
    text: z.string().optional(),
    link: z.string().optional(),
  }),
})
export type NotionBreadcrumbBlockType = z.infer<typeof NotionBreadcrumbBlockSchema>

export const NotionChildDatabaseBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('child_database'),
  child_database: z.object({
    title: z.string(),
  }),
})
export type NotionChildDatabaseBlockType = z.infer<typeof NotionChildDatabaseBlockSchema>

export const NotionColumnBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('column'),
  column: z.object({
    ratio: z.number(),
  }),
})
export type NotionColumnBlockType = z.infer<typeof NotionColumnBlockSchema>

export const NotionColumnListBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('column_list'),
})
export type NotionColumnListBlockType = z.infer<typeof NotionColumnListBlockSchema>

export const NotionEmbedBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('embed'),
  embed: z.object({
    caption: z.array(NotionTextSchema.optional()).optional().nullable(),
    url: z.string(),
  }),
})
export type NotionEmbedBlockType = z.infer<typeof NotionEmbedBlockSchema>

export const NotionFileBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('file'),
  file: NotionFileSchema,
})
export type NotionFileBlockType = z.infer<typeof NotionFileBlockSchema>

export const NotionImageBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('image'),
  image: NotionFileSchema,
})
export type NotionImageBlockType = z.infer<typeof NotionImageBlockSchema>

export const NotionLinkPreviewBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('link_preview'),
  link_preview: z.object({
    url: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: NotionFileSchema.nullable().optional(),
  }),
})
export type NotionLinkPreviewBlockType = z.infer<typeof NotionLinkPreviewBlockSchema>

export const NotionLinkToPageBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('link_to_page'),
})
export type NotionLinkToPageBlockType = z.infer<typeof NotionLinkToPageBlockSchema>

export const NotionPdfBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('pdf'),
  pdf: NotionFileSchema,
})
export type NotionPdfBlockType = z.infer<typeof NotionPdfBlockSchema>

export const NotionTableRowBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('table_row'),
})
export type NotionTableRowBlockType = z.infer<typeof NotionTableRowBlockSchema>

export const NotionTemplateBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('template'),
  template: z.object({
    rich_text: z.array(NotionTextSchema.optional()),
  }),
})
export type NotionTemplateBlockType = z.infer<typeof NotionTemplateBlockSchema>

export const NotionVideoBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('video'),
  video: NotionFileSchema,
})
export type NotionVideoBlockType = z.infer<typeof NotionVideoBlockSchema>

export const NotionAudioBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('audio'),
  audio: NotionFileSchema,
})
export type NotionAudioBlockType = z.infer<typeof NotionAudioBlockSchema>

export const NotionCodeBlockSchema = NotionBlockBaseSchema.extend({
  type: z.literal('code'),
  code: z.object({
    caption: z.array(NotionTextSchema.optional()),
    rich_text: z.array(NotionTextSchema.optional()),
    language: z.string(),
  }),
})
export type NotionCodeBlockType = z.infer<typeof NotionCodeBlockSchema>

export const NotionBlockSchema = z.discriminatedUnion('type', [
  NotionBookmarkBlockSchema,
  NotionBreadcrumbBlockSchema,
  NotionBulletedListItemBlockSchema,
  NotionCalloutBlockSchema,
  NotionChildDatabaseBlockSchema,
  NotionChildPageBlockSchema,
  NotionColumnBlockSchema,
  NotionColumnListBlockSchema,
  NotionDividerBlockSchema,
  NotionEmbedBlockSchema,
  NotionEquationBlockSchema,
  NotionFileBlockSchema,
  NotionHeading1BlockSchema,
  NotionHeading2BlockSchema,
  NotionHeading3BlockSchema,
  NotionImageBlockSchema,
  NotionLinkPreviewBlockSchema,
  NotionLinkToPageBlockSchema,
  NotionNumberedListItemBlockSchema,
  NotionParagraphBlockSchema,
  NotionPdfBlockSchema,
  NotionQuoteBlockSchema,
  NotionSyncedBlockSchema,
  NotionTableBlockSchema,
  NotionTableOfContentsBlockSchema,
  NotionTableRowBlockSchema,
  NotionTemplateBlockSchema,
  NotionTodoBlockSchema,
  NotionToggleBlockSchema,
  NotionUnsupportedBlockSchema,
  NotionVideoBlockSchema,
  NotionAudioBlockSchema,
  NotionCodeBlockSchema,
])
export type NotionBlockType = z.infer<typeof NotionBlockSchema>
