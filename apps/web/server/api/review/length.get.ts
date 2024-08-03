import { kv } from '@vercel/kv'
import { reviewKey } from '~/schema/review'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  return await kv.llen(reviewKey)
})
