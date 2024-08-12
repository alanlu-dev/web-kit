import https from 'node:https'

function revalidate(host: string, path: string) {
  return new Promise(function (resolve, reject) {
    const options = {
      hostname: host,
      port: 443,
      path,
      method: 'GET', // MUST be "GET" or "HEAD" ("POST" method will not work)
      headers: {
        'x-prerender-revalidate': process.env.VERCEL_BYPASS_TOKEN,
      },
    }
    const revalidateRequest = https.request(options, (revalidateResponse) => {
      const cacheHeader = revalidateResponse.headers['x-vercel-cache']
      if (cacheHeader !== 'REVALIDATED') {
        console.error(new Error(`Revalidation of ${path} failed.`))
        reject(new Error(`Revalidation of ${path} failed: "x-vercel-cache" is "${cacheHeader}"`))
        return
      }

      resolve(true)
    })

    revalidateRequest.on('error', (error) => {
      console.error(error)
      reject(error)
    })

    revalidateRequest.end()
  })
}

export default defineEventHandler<{
  query: {
    secret: string
    path: string
  }
}>(async (event) => {
  const { secret, path: pathToRevalidate } = getQuery(event)

  if (secret !== process.env.VERCEL_BYPASS_TOKEN) {
    // 403
    return sendError(event, new Error('Invalid secret'))
  }

  // host
  const host = event.node.req.headers.host!
  const deployedUrl = `https://${host}`
  event.node.res.setHeader('Content-Type', 'text/html charset=utf-8')

  revalidate(host, pathToRevalidate)
    .then(() => {
      event.node.res.end(`
      <h1>Cache for "${pathToRevalidate}" Revalidated!</h1>
      <p>Redirecting you back.</p>
      <meta http-equiv="refresh" content="2 url=${deployedUrl}${pathToRevalidate}">
    `)
    })
    .catch((error) => {
      console.error(error.stack)
      event.node.res.statusCode = 500
      event.node.res.end(`
      <h1>Cache for "${pathToRevalidate}" NOT Revalidated!</h1>
      <p>Failed to revalidate: ${error.message}</p>
    `)
    })
})
