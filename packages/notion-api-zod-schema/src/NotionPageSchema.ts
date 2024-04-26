import { z } from 'zod'
import type { NotionBlockType } from './NotionBlockSchema'
import { NotionEmojiSchema } from './NotionTextSchema'
import { NotionObjectSchema } from './NotionObjectSchema'
import { NotionExternalFileObjectSchema, NotionFileSchema, NotionInternalFileObjectSchema } from './NotionFileSchema'
import { NotionDatabaseCellSchema, NotionDatabasePropertySchema, NotionTitleSchema } from './NotionDatabaseSchema'

export const NotionPageSchema = NotionObjectSchema.extend({
  object: z.literal('page'),
  cover: NotionFileSchema.nullable(),
  icon: z.discriminatedUnion('type', [NotionEmojiSchema, NotionInternalFileObjectSchema, NotionExternalFileObjectSchema]).nullish(),
  properties: z.record(z.union([NotionDatabaseCellSchema.merge(NotionTitleSchema), NotionDatabasePropertySchema])),
})
export type NotionPageType = z.infer<typeof NotionPageSchema>

export type NotionPageWithContentsType = NotionPageType & {
  contents: NotionBlockType[]
}
