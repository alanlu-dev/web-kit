import { getNewsByIdAsync } from '~/server/service/news/get'

export default defineWrappedResponseHandler<{
  query: {
    refresh?: boolean
  }
}>(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入產業消息編號')
  }

  const { refresh: r } = getQuery(event)
  const config = useRuntimeConfig()
  const refresh = event.node.req.headers['x-prerender-revalidate'] === config.vercel.bypassToken || (config.public.isDev && !!r)

  const item = await getNewsByIdAsync(null, +id, refresh)
  if (!item) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(event.node.res.statusCode, '找不到該產業消息')
  }

  return createApiResponse(200, 'OK', item)
})
