import type { OrderParamsSchemaType } from '~/schema/order'
import { processEcPayOrder } from '~/server/service/payment/ecpay'

export default defineWrappedResponseHandler<{
  body: OrderParamsSchemaType
}>(async (event) => {
  const params = await readBody(event)

  return await processEcPayOrder(event, params)
})
