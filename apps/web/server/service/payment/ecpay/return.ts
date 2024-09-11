import { Client } from '@notionhq/client'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { format } from '@formkit/tempo'
import { OrderSchema } from '~/schema/order'

export interface EcPayPaymentResult {
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

export async function getPaymentResult(order_page_id: string, data: EcPayPaymentResult) {
  const notion = new Client({ auth: useRuntimeConfig().notion.apiKey })

  // 記錄回傳資訊
  await notion.blocks.children.append({
    block_id: order_page_id,
    children: [{ paragraph: { rich_text: [{ text: { content: data ? JSON.stringify(data) : 'null' } }] } }],
  })

  // 更新狀態
  const page = await notion.pages.update({
    page_id: order_page_id,
    properties: {
      付款方式: { rich_text: [{ text: { content: data?.PaymentType || 'null' } }] },
      金流代碼: { rich_text: [{ text: { content: data?.RtnCode || 'null' } }] },
      金流訊息: { rich_text: [{ text: { content: data?.RtnMsg || 'null' } }] },
      付款日期: {
        date: {
          start: format({ date: new Date(), format: 'YYYY-MM-DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' }),
          time_zone: 'Asia/Taipei',
        },
      },
    },
  })
  const parsedPage = NotionPageSchema.parse(page)
  const order = OrderSchema.parse(parsedPage.properties)

  // 更新訂單狀態
  if (order.訂單狀態 !== '金流:人工作廢') {
    await notion.pages.update({
      page_id: order_page_id,
      properties: {
        訂單狀態: { status: { name: data?.RtnCode === '1' ? '金流:付款成功' : '金流:付款失敗' } },
      },
    })
  }
  else {
    await notion.pages.update({
      page_id: order_page_id,
      properties: {
        訂單狀態: { status: { name: data?.RtnCode === '1' ? '金流:作廢後成功' : '金流:作廢後失敗' } },
      },
    })
  }
}
