import type { APIErrorCode, ClientErrorCode } from '@notionhq/client'

export type ResponseMessage = number | string | ClientErrorCode | APIErrorCode

export interface ApiResponse<T = any> {
  rc: ResponseMessage
  rm: string
  data?: T
}

export function createApiResponse<T = any>(rc: ResponseMessage, rm: string, data?: T): ApiResponse<T> {
  return { rc, rm, data }
}

export function createApiError<T = any>(rc: ResponseMessage, rm: string, data?: T): ApiResponse<T> {
  if (useRuntimeConfig().public.isDev) {
    return { rc, rm, data }
  }
  return { rc, rm }
}

// 可選：定義一些常用的錯誤碼
export const ErrorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // 自定義錯誤碼
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  BUSINESS_LOGIC_ERROR: 'BUSINESS_LOGIC_ERROR',
  // 添加更多錯誤碼...
}
