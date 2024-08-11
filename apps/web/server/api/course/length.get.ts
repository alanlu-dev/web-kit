import { courseKey } from '~/schema/course'

export default defineEventHandler(async () => {
  // const { page, page_size, refresh } = getQuery(event)

  return await redis.lLen(courseKey)
})
