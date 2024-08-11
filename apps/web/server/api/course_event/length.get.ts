import { courseEventKey } from '~/schema/course_event'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  return await redis.lLen(courseEventKey)
})
