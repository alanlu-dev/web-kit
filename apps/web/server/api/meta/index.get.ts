import { getMetaAsync } from '~/server/service/meta/get'

export default defineWrappedResponseHandler(async (event) => {
  const refresh = event.node.req.headers['x-prerender-revalidate'] === useRuntimeConfig().vercel.bypassToken

  const items = await getMetaAsync(null, refresh)
  return createApiResponse(200, 'OK', items)
})
