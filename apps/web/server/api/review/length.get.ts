import { reviewKey } from '~/schema/review'

export default defineEventHandler(async () => {
  // const { page, page_size } = getQuery(event)

  return await redis.lLen(reviewKey)
})
