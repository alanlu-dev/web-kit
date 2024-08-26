import { getClassroomByIdAsync } from '~/server/service/classroom/get'

export default defineWrappedResponseHandler<{
  query: {
    refresh?: boolean
  }
}>(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入教室編號')
  }

  const { refresh: r } = getQuery(event)
  const config = useRuntimeConfig()
  const refresh = event.node.req.headers['x-prerender-revalidate'] === config.vercel.bypassToken || (config.public.isDev && !!r)

  const item = await getClassroomByIdAsync(null, +id, refresh)
  if (!item) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(event.node.res.statusCode, '找不到該教室')
  }

  return createApiResponse(200, 'OK', item)
})
