import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'

interface PaymentResult {
  CustomField1: string
  CustomField2: string
  CustomField3: string
  CustomField4: string
  MerchantID: string
  MerchantTradeNo: string
  PaymentDate: string
  PaymentType: string
  PaymentTypeChargeFee: string
  RtnCode: string
  RtnMsg: string
  SimulatePaid: string
  StoreID: string
  TradeAmt: string
  TradeDate: string
  TradeNo: string
  CheckMacValue: string
}

export default defineEventHandler<{
  body: any
}>(async (event) => {
  const order_page_id = getRouterParam(event, 'order_page_id')!
  const data = await readBody<PaymentResult>(event)

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    // 新增聯絡紀錄
    await notion.pages.update({
      page_id: order_page_id,
      properties: {
        付款狀態: { status: { name: data.RtnCode === '1' ? '待請款' : '付款失敗' } },
        金流代碼: { rich_text: [{ text: { content: data.RtnCode } }] },
        金流訊息: { rich_text: [{ text: { content: data.RtnMsg } }] },
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
