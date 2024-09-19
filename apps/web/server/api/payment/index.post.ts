import type { OrderParamsSchemaType } from '~/schema/order'
import { OrderPaymentMethodEnum } from '~/schema/payment'
import { processEcPayOrder } from '~/server/service/payment/ecpay'
import { processFreeOrder } from '~/server/service/payment/free'
import { processOfflineOrder } from '~/server/service/payment/offline'
import { verifyRecaptchaAsync } from '~/server/service/recaptcha'

export default defineWrappedResponseHandler<{
  body: OrderParamsSchemaType & { recaptchaV2: string }
}>(async (event) => {
  const params = await readBody(event)

  if (!(await verifyRecaptchaAsync(params.recaptchaV2))) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '驗證碼錯誤')
  }

  switch (params.paymentMethod) {
    case OrderPaymentMethodEnum.enum.綠界:
      return await processEcPayOrder(event, params)
    case OrderPaymentMethodEnum.enum.現金:
      return await processOfflineOrder(event, params)
    case OrderPaymentMethodEnum.enum.免費:
      return await processFreeOrder(event, params)
    default:
      return createApiError(ErrorCodes.UNPROCESSABLE_ENTITY, '不支援的付款方式')
  }
})
