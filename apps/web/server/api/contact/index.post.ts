import type { ContactSchemaType } from '~/schema/contact'
import { addContactAsync } from '~/server/service/contact/add'

export default defineWrappedResponseHandler<{
  body: ContactSchemaType & { turnstile: string }
}>(async (event) => {
  const params = await readBody(event)

  const verifyTurnstile = await verifyTurnstileToken(params.turnstile)
  if (!verifyTurnstile.success) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '驗證碼錯誤')
  }

  const result = await addContactAsync(params)
  return createApiResponse(200, 'OK', result)
})
