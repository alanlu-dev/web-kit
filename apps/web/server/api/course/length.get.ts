import { courseKey } from '~/schema/course'

export default defineWrappedResponseHandler(async () => {
  const len = await redis.lLen(courseKey)
  return createApiResponse(200, 'OK', len)
})
