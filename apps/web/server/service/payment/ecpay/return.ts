import { Client } from '@notionhq/client'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { formatThousand } from '@alanlu-dev/utils'
import { addDay, format } from '@formkit/tempo'
import { render } from '@vue-email/render'
import MyTemplate from '~/server/service/templates/ecpay_success.vue'
import type { OrderSchemaType } from '~/schema/order'
import { OrderSchema } from '~/schema/order'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'

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

const config = useRuntimeConfig()

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
          start: format({ date: new Date(), format: 'YYYY/MM/DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' }),
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

  if (data?.RtnCode === '1') {
    // 取得課程場次資訊
    order.課程場次資訊 = await getCourseEventByIdAsync(notion, order.課程場次ID!, false)

    await sendEmail(notion, order_page_id, order)
  }
}

async function sendEmail(notion: Client, order_page_id: string, order: OrderSchemaType) {
  // 發信
  let emailResult: any = null
  try {
    // 組成信件內容
    const html = await render(
      MyTemplate,
      {
        siteUrl: config.public.siteUrl,
        siteName: config.public.siteName,
        courseName: order.課程場次資訊!.課程資訊_名稱!,
        courseLink: `${config.public.siteUrl}/course/${order.課程場次資訊?.課程ID}`,
        studentName: maskName(order.會員名稱),
        orderNumber: order.訂單編號!,
        paymentAmount: `NT$ ${formatThousand(order.付款金額!)}`,
        paymentType: order.付款方式 === 'Credit_CreditCard' ? '信用卡' : order.付款方式!,
        paymentDate: order.付款日期!,
        courseDate: order.課程場次資訊!.上課日期![0]!,
        courseTime: order.課程場次資訊!.上課日期![1]!,
        // 課程⽇期減 7 天
        courseDateMinus7: format({ date: addDay(order.課程場次資訊!.上課日期![2]!, -7), format: 'YYYY/MM/DD', locale: 'zh-TW', tz: 'Asia/Taipei' }),
        courseLocation: order.課程場次資訊!.教室資訊!.地址!,
        logoSrc: `${config.public.siteUrl}/logo.png`,
      },
      {
        pretty: true,
      },
    )

    const { sendMail } = useNodeMailer()
    emailResult = await sendMail({
      subject: `恭喜！您已成功報名${config.public.siteName}【${order.課程場次資訊?.課程資訊_名稱}】`,
      html,
      to: order.會員信箱,
    })
  }
  catch (error) {
    emailResult = error
  }

  // 記錄結果
  await notion.blocks.children.append({
    block_id: order_page_id,
    children: [{ paragraph: { rich_text: [{ text: { content: JSON.stringify(emailResult) } }] } }],
  })

  if (emailResult.accepted[0]) {
    await notion.pages.update({
      page_id: order_page_id,
      properties: {
        通知信是否發送: { checkbox: true },
      },
    })
  }
}
