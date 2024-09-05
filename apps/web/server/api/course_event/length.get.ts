import { courseEventKey } from '~/schema/course_event'

export default defineWrappedResponseHandler(async () => {
  const len = await redis.lLen(courseEventKey)
  return createApiResponse(200, 'OK', len)
})
