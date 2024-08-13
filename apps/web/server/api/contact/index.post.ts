import type { ContactSchemaType } from '~/schema/contact'
import { addContactAsync } from '~/server/service/contact/add'

export default defineWrappedResponseHandler<{
  body: ContactSchemaType
}>(async (event) => {
  const data = await readBody(event)

  const result = await addContactAsync(data)
  return createApiResponse(200, 'OK', result)
})
