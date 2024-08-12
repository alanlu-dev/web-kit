import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client'

export default defineEventHandler(async (event) => {
  const paramPosition = getRouterParam(event, 'position')
  if (!paramPosition) return []
  const position = decodeURIComponent(paramPosition)

  try {
    return await getGalleryByPositionAsync(null, position, false)
  }
  catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          // ...
          break
        case APIErrorCode.ObjectNotFound:
          // ...
          break
        case APIErrorCode.Unauthorized:
          // ...
          break
      }
    }
    return error
  }
})
