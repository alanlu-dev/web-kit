import { reviewKey } from '~/schema/review'

export default defineWrappedResponseHandler(async () => {
  const len = await redis.lLen(reviewKey)
  return createApiResponse(200, 'OK', len)
})
