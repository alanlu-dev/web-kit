import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string(),
  mobile: z.string(),
  email: z.string().email(),
  title: z.string(),
  message: z.string(),
})
export type ContactSchemaType = z.infer<typeof ContactSchema>
