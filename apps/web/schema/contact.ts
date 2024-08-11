import { z } from 'zod'
import { MemberSchema } from './member'

export const ContactSchema = MemberSchema.extend({
  title: z.string(),
  message: z.string(),
})
export type ContactSchemaType = z.infer<typeof ContactSchema>
