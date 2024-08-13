export default defineWrappedResponseHandler<{
  query: {
    path: string
    secret: string
  }
}>(async (event) => {
  const { path: pathToRevalidate, secret } = getQuery(event)

  if (!pathToRevalidate) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入欲重新整理的路徑')
  }

  const config = useRuntimeConfig()

  if (secret !== config.vercel.bypassToken) {
    setResponseStatus(event, ErrorCodes.FORBIDDEN)
    return createApiError(event.node.res.statusCode, '禁止存取')
  }

  const url = `https://${event.node.req.headers.host!}${pathToRevalidate}`

  console.log(`Revalidating ${url}...`)

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-prerender-revalidate': config.vercel.bypassToken,
    },
  })

  const isJsonResponse = res.headers.get('content-type')?.includes('application/json')
  if (isJsonResponse) {
    const data = await res.json()
    return createApiResponse(200, '重新整理成功', data)
  }

  return createApiResponse(200, '重新整理成功')
})
