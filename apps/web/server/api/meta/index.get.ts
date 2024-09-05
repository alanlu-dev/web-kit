import { getMetaAsync } from '~/server/service/meta/get'

export default defineWrappedResponseHandler<{
  query: {
    refresh?: boolean
  }
}>(async (event) => {
  const { refresh: r } = getQuery(event)
  const config = useRuntimeConfig()
  const refresh = event.node.req.headers['x-prerender-revalidate'] === config.vercel.bypassToken || (config.public.isDev && !!r)

  const items = await getMetaAsync(null, refresh)
  return createApiResponse(200, 'OK', items)
})
