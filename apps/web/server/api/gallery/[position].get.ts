import { getGalleryByPositionAsync } from '~/server/service/gallery/get'

export default defineWrappedResponseHandler(async (event) => {
  const paramPosition = getRouterParam(event, 'position')
  if (!paramPosition) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入位置參數')
  }

  const position = decodeURIComponent(paramPosition)

  const refresh = event.node.req.headers['x-prerender-revalidate'] === useRuntimeConfig().vercel.bypassToken

  const items = await getGalleryByPositionAsync(null, position, refresh)
  return createApiResponse(200, 'OK', items)
})
