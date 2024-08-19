import { getCourseBasesAsync } from '~/server/service/course_base/get'

export default defineWrappedResponseHandler<{
  query: {
    page?: string
    page_size?: string
  }
}>(async (event) => {
  const { page, page_size } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 99

  const refresh = event.node.req.headers['x-prerender-revalidate'] === useRuntimeConfig().vercel.bypassToken

  const items = await getCourseBasesAsync(null, currentPage, pageSize, refresh)
  return createApiResponse(200, 'OK', items)
})
