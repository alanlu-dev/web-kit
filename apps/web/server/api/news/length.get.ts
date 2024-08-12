import { newsKey } from '~/schema/news'

export default defineEventHandler(async () => {
  // const { page, page_size } = getQuery(event)

  return await redis.lLen(newsKey)
})
