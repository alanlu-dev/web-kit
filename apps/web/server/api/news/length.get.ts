import { kv } from '@vercel/kv'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  const key = `news`
  return await kv.llen(key)
})
