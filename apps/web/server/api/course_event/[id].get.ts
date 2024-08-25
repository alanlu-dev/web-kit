import { getCourseEventByIdAsync } from '~/server/service/course_events/get'

export default defineWrappedResponseHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入課程場次編號')
  }

  const refresh = event.node.req.headers['x-prerender-revalidate'] === useRuntimeConfig().vercel.bypassToken

  const item = await getCourseEventByIdAsync(null, +id, refresh)
  if (!item) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(event.node.res.statusCode, '找不到該課程場次')
  }

  return createApiResponse(200, 'OK', item)
})
