import https from 'node:https'

export default defineEventHandler<{
  query: {
    secret: string
    path: string
  }
}>(async (event) => {
  const { secret, path: pathToRevalidate } = getQuery(event)

  console.log(secret, process.env.VERCEL_BYPASS_TOKEN)
  if (!pathToRevalidate) {
    // 400
    event.node.res.statusCode = 400
    return {
      rc: 400,
      rm: 'Bad Request',
    }
  }

  if (secret !== process.env.VERCEL_BYPASS_TOKEN) {
    // 403
    event.node.res.statusCode = 403
    return {
      rc: 403,
      rm: 'Forbidden',
    }
  }

  const url = `https://${event.node.req.headers.host!}${pathToRevalidate}`

  console.log(`Revalidating ${url}...`)

  try {
    const res = await $fetch(url, {
      hostname: event.node.req.headers.host!,
      method: 'GET', // MUST be "GET" or "HEAD" ("POST" method will not work)
      headers: {
        'x-prerender-revalidate': process.env.VERCEL_BYPASS_TOKEN,
      },
    })

    return res
  }
  catch (error) {
    event.node.res.statusCode = 500
    return {
      rc: 500,
      rm: error,
    }
  }
})
