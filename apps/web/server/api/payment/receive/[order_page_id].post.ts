import type { EcPayPaymentResult } from '~/server/service/payment/ecpay/return'
import { getPaymentResult } from '~/server/service/payment/ecpay/return'

export default defineWrappedResponseHandler<{
  body: any
}>(async (event) => {
  const order_page_id = getRouterParam(event, 'order_page_id')!
  const data = await readBody<EcPayPaymentResult>(event)

  await getPaymentResult(order_page_id, data)

  return '1|OK'
})
