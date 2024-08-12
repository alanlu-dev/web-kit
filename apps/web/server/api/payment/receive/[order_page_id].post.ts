import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { formatThousand } from '@alanlu-dev/utils'
import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'
import { render } from '@vue-email/render'
import { render as renderCSS } from '@master/css-server'
import config from '@jiehousekeeper/master-css-config'
import MyTemplate from '../../../templates/success.vue'
import { OrderSchema } from '~/schema/order'

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

function maskName(name: string | undefined): string {
  if (!name || name.length <= 1) {
    return '○'
  }
  const firstChar = name[0]
  const lastChar = name[name.length - 1]
  const maskedMiddle = '○'.repeat(name.length - 2)
  return `${firstChar}${maskedMiddle}${lastChar}`
}

export default defineEventHandler<{
  body: any
}>(async (event) => {
  const order_page_id = getRouterParam(event, 'order_page_id')!
  const data = await readBody<PaymentResult>(event)

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    // 新增聯絡紀錄
    const page = await notion.pages.update({
      page_id: order_page_id,
      properties: {
        付款狀態: { status: { name: data?.RtnCode === '1' ? '待請款' : '付款失敗' } },
        付款方式: { rich_text: [{ text: { content: data?.PaymentType || 'null' } }] },
        金流代碼: { rich_text: [{ text: { content: data?.RtnCode || 'null' } }] },
        金流訊息: { rich_text: [{ text: { content: data?.RtnMsg || 'null' } }] },
      },
    })

    await notion.blocks.children.append({
      block_id: order_page_id,
      children: [{ paragraph: { rich_text: [{ text: { content: data ? JSON.stringify(data) : 'null' } }] } }],
    })

    if (data?.RtnCode === '1') {
      const parsedPage = NotionPageSchema.parse(page)
      const order = OrderSchema.parse(parsedPage.properties)
      order.課程安排資訊 = await getCourseEventByIdAsync(notion, order.課程安排ID!, false)

      try {
        const html = await render(
          MyTemplate,
          {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL!,
            courseName: order.課程安排資訊!.課程資訊_名稱!,
            courseLink: `${process.env.NUXT_PUBLIC_SITE_URL}/course_event/${order.課程安排ID}`,
            studentName: maskName(order.會員名稱),
            orderNumber: order.訂單編號!,
            paymentAmount: `NT$ ${formatThousand(order.付款金額!)}`,
            paymentType: order.付款方式!,
            paymentDate: new Date().toLocaleDateString('zh-TW', {
              timeZone: 'Asia/Taipei',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            courseDate: order.課程安排資訊!.上課日期![0]!,
            courseTime: order.課程安排資訊!.上課日期![1]!,
            // 課程⽇期減 7 天
            courseDateMinus7: new Date(new Date(order.課程安排資訊!.上課日期![2]!).getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-TW', {
              timeZone: 'Asia/Taipei',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            courseLocation: order.課程安排資訊!.教室資訊!.地址!,
            logoSrc: `${process.env.NUXT_PUBLIC_SITE_URL}/about/jie_housekeeper.png`,
          },
          {
            pretty: true,
          },
        )
        const rendered = renderCSS(html, config)

        console.log(process.env.NUXT_NODEMAILER_AUTH_USER, process.env.NUXT_NODEMAILER_AUTH_PASS)
        const { sendMail } = useNodeMailer()
        const emailResult = await sendMail({
          subject: `恭喜！您已成功報名中華民國職業認證協會【${order.課程安排資訊?.課程資訊_名稱}】`,
          html: rendered.html,
          to: order.會員信箱,
        })

        await notion.blocks.children.append({
          block_id: order_page_id,
          children: [{ paragraph: { rich_text: [{ text: { content: JSON.stringify(emailResult) } }] } }],
        })
      }
      catch (error) {
        await notion.blocks.children.append({
          block_id: order_page_id,
          children: [{ paragraph: { rich_text: [{ text: { content: JSON.stringify(error) } }] } }],
        })
      }
    }

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
