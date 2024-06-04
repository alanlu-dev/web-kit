import { kv } from '@vercel/kv'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  const key = `course_event`
  return await kv.llen(key)
})
