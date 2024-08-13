import { getMetaByPathAsync } from '~/server/service/meta/get'

export default defineWrappedResponseHandler(async (event) => {
  const fullPath = getRouterParam(event, 'slug')

  if (!fullPath) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入路由')
  }

  const refresh = event.node.req.headers['x-prerender-revalidate'] === useRuntimeConfig().vercel.bypassToken

  const items = await getMetaByPathAsync(null, fullPath, refresh)
  return createApiResponse(200, 'OK', items)
})
