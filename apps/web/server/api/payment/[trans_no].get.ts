import { getOrderByTransNoAsync } from '~/server/service/order/get'

export default defineWrappedResponseHandler(async (event) => {
  const trans_no = getRouterParam(event, 'trans_no')
  if (!trans_no) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入訂單編號')
  }

  const item = await getOrderByTransNoAsync(null, trans_no)

  if (!item) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(event.node.res.statusCode, '找不到該訂單')
  }

  return createApiResponse(200, 'OK', item)
})
