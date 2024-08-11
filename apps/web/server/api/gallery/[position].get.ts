import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client'

export default defineEventHandler<{
  query: {
    refresh?: boolean
  }
}>(async (event) => {
  const paramPosition = getRouterParam(event, 'position')
  if (!paramPosition) return []
  const position = decodeURIComponent(paramPosition)

  const { refresh } = getQuery(event)

  try {
    return await getGalleryByPositionAsync(null, position, !!refresh)
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
