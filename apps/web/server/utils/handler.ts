import type { EventHandler, EventHandlerRequest, EventHandlerResponse } from 'h3'
import { isNotionClientError } from '@notionhq/client'

export function defineWrappedResponseHandler<T extends EventHandlerRequest, D = EventHandlerResponse>(handler: EventHandler<T, D>): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const response = await handler(event)
      // do something after the route handler
      return response
    }
    catch (error: unknown) {
      setResponseStatus(event, ErrorCodes.INTERNAL_SERVER_ERROR)
      if (isNotionClientError(error)) {
        return createApiError(error.code, error.message, error)
      }
      return createApiError(event.node.res.statusCode, '伺服器錯誤', error)
    }
  })
}
