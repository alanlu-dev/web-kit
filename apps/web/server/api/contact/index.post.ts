import type { ContactSchemaType } from '~/schema/contact'
import { addContactAsync } from '~/server/service/contact/add'
import { verifyRecaptchaAsync } from '~/server/service/recaptcha'

export default defineWrappedResponseHandler<{
  body: ContactSchemaType & { recaptcha: string }
}>(async (event) => {
  const params = await readBody(event)

  if (!(await verifyRecaptchaAsync(params.recaptcha))) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '驗證碼錯誤')
  }

  const result = await addContactAsync(params)
  return createApiResponse(200, 'OK', result)
})
