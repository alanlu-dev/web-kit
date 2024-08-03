import { z } from 'zod'
import { NotionEmailSchema, NotionPhoneNumberSchema, NotionTitleSchema, NotionUniqueIdSchema } from '@alanlu-dev/notion-api-zod-schema'

export const MemberSchema = z.object({
  ID: NotionUniqueIdSchema.transform((o) => o.unique_id.number),
  PAGE_ID: z.string().optional(),

  名稱: NotionTitleSchema.transform((o) => (o.title[0]?.type === 'text' ? o.title[0].plain_text : undefined)),
  信箱: NotionEmailSchema.transform((o) => o.email),
  手機: NotionPhoneNumberSchema.transform((o) => o.phone_number),
})
export type MemberSchemaType = z.infer<typeof MemberSchema>
