import { courseKey } from '~/schema/course'

export default defineEventHandler(async () => {
  // const { page, page_size } = getQuery(event)

  return await redis.lLen(courseKey)
})
