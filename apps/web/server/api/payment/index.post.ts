import { OrderPaymentMethodEnum } from '~/schema/payment'
import type { OrderParamsSchemaType } from '~/schema/order'
import { processEcPayOrder } from '~/server/service/payment/ecpay'
import { processFreeOrder } from '~/server/service/payment/free'
import { processOfflineOrder } from '~/server/service/payment/offline'

export default defineWrappedResponseHandler<{
  body: OrderParamsSchemaType
}>(async (event) => {
  const params = await readBody(event)

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
