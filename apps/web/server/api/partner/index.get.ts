import { getPartnersAsync } from '~/server/service/partner/get'

export default defineWrappedResponseHandler<{
  query: {
    page?: string
    page_size?: string
    refresh?: boolean
  }
}>(async (event) => {
  const { page, page_size, refresh: r } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 99

  const config = useRuntimeConfig()
  const refresh = event.node.req.headers['x-prerender-revalidate'] === config.vercel.bypassToken || (config.public.isDev && !!r)

  const items = await getPartnersAsync(null, currentPage, pageSize, refresh)
  return createApiResponse(200, 'OK', items)
})
