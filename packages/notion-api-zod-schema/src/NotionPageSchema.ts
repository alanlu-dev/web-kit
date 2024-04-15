import { z } from 'zod'
import type { NotionBlockType } from './NotionBlockSchema'
import { NotionObjectSchema } from './NotionObjectSchema'
import { NotionFileSchema } from './NotionFileSchema'

export const NotionPageSchema = NotionObjectSchema.extend({
  object: z.literal('page'),
  cover: NotionFileSchema.nullable(),
  icon: NotionFileSchema.nullable(),
})
export type NotionPageType = z.infer<typeof NotionPageSchema>

export type NotionPageWithContentsType = NotionPageType & {
  contents: NotionBlockType[]
}
