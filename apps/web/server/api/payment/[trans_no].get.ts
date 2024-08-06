import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client'

export default defineEventHandler(async (event) => {
  const trans_no = getRouterParam(event, 'trans_no')
  console.log('trans_no', trans_no)
  if (!trans_no) return null

  try {
    const item = await getOrderByTransNoAsync(null, trans_no)
    console.log('item', item)
    if (!item) {
      const responseData = { rc: 404, rm: 'Not Found' }
      event.node.res.statusCode = responseData.rc
      return responseData
    }
    console.log(item)

    return item
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
