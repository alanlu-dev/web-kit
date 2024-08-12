async function revalidatePath(path: string) {
  const response = await fetch(`${process.env.NUXT_PUBLIC_SITE_URL}${path}`, {
    method: 'GET',
    headers: {
      'x-prerender-revalidate': process.env.VERCEL_BYPASS_TOKEN!,
    },
  })

  if (response.ok) {
    console.log('Revalidation successful', path)
  }
  else {
    console.error('Revalidation failed', path)
  }
}

export default defineEventHandler<{
  query: {
    secret: string
    path: string
  }
}>(async (event) => {
  const { secret, path } = getQuery(event)

  if (secret !== process.env.VERCEL_BYPASS_TOKEN) {
    return sendError(event, new Error('Invalid token'))
  }

  try {
    await revalidatePath(path)
    return { revalidated: true }
  }
  catch (err) {
    return sendError(event, new Error(`Error revalidating, ${err}`))
  }
})
