import { z } from 'zod'
import type { NotionBlockType } from './NotionBlockSchema'
import { NotionEmojiSchema, NotionTextSchema } from './NotionTextSchema'
import { NotionObjectSchema } from './NotionObjectSchema'
import { NotionExternalFileObjectSchema, NotionFileSchema, NotionInternalFileObjectSchema } from './NotionFileSchema'

export const NotionPageSchema = NotionObjectSchema.extend({
  object: z.literal('page'),
  cover: NotionFileSchema.nullable(),
  icon: z.discriminatedUnion('type', [NotionEmojiSchema, NotionInternalFileObjectSchema, NotionExternalFileObjectSchema]).nullish(),
  properties: z.object({
    title: z.object({
      id: z.string(),
      type: z.literal('title'),
      title: z.array(NotionTextSchema),
    }),
  }),
})
export type NotionPageType = z.infer<typeof NotionPageSchema>

export type NotionPageWithContentsType = NotionPageType & {
  contents: NotionBlockType[]
}
