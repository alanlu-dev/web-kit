import { z } from 'zod'

export const MemberSchema = z.object({
  name: z.string(),
  mobile: z.string(),
  email: z.string().email(),
})
export type MemberSchemaType = z.infer<typeof MemberSchema>
