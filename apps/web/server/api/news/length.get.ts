import { kv } from '@vercel/kv'
import { newsKey } from '~/schema/news'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  return await kv.llen(newsKey)
})
