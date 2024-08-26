import { getGalleryByPositionAsync } from '~/server/service/gallery/get'

export default defineWrappedResponseHandler<{
  query: {
    refresh?: boolean
  }
}>(async (event) => {
  const paramPosition = getRouterParam(event, 'position')
  if (!paramPosition) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入位置參數')
  }

  const position = decodeURIComponent(paramPosition)

  const { refresh: r } = getQuery(event)
  const config = useRuntimeConfig()
  const refresh = event.node.req.headers['x-prerender-revalidate'] === config.vercel.bypassToken || (config.public.isDev && !!r)

  const items = await getGalleryByPositionAsync(null, position, refresh)
  return createApiResponse(200, 'OK', items)
})
