import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client'

export default defineEventHandler(async (event) => {
  const paramPosition = getRouterParam(event, 'position')
  if (!paramPosition) return []
  const position = decodeURIComponent(paramPosition)

  const refresh = event.node.req.headers['x-prerender-revalidate'] === process.env.VERCEL_BYPASS_TOKEN

  try {
    return await getGalleryByPositionAsync(null, position, refresh)
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
