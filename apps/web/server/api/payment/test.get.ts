import { getPaymentResult } from '~/server/service/payment/ecpay/return'

export default defineWrappedResponseHandler(async () => {
  return getPaymentResult('0da1ea53509c4fc1ac79444986c98966', null)
})
