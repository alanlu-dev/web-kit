import { newsKey } from '~/schema/news'

export default defineWrappedResponseHandler(async () => {
  const len = await redis.lLen(newsKey)
  return createApiResponse(200, 'OK', len)
})
