import { courseEventKey } from '~/schema/course_event'

export default defineEventHandler(async () => {
  // const { page, page_size } = getQuery(event)

  return await redis.lLen(courseEventKey)
})
