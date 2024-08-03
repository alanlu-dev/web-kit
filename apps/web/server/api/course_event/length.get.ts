import { kv } from '@vercel/kv'
import { courseEventKey } from '~/schema/course_event'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  return await kv.llen(courseEventKey)
})
