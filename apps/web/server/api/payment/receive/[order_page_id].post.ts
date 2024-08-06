import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'

export default defineEventHandler<{
  body: any
}>(async (event) => {
  const order_page_id = getRouterParam(event, 'order_page_id')!
  const data = await readBody(event)

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    // 新增聯絡紀錄
    await notion.pages.update({
      page_id: order_page_id,
      properties: {
        付款狀態: { status: { name: '待請款' } },
      },
    })

    await notion.blocks.children.append({
      block_id: order_page_id,
      children: [{ paragraph: { rich_text: [{ text: { content: JSON.stringify(data) } }] } }],
    })

    return '1|OK'
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
