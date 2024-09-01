import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'
import { formatThousand } from '@alanlu-dev/utils'
import { addDay, format } from '@formkit/tempo'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { render } from '@vue-email/render'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'
import { getMemberIdAsync } from '~/server/service/member/get'
import { getMonthIdAsync } from '~/server/service/month/get'
import type { OrderParamsSchemaType, OrderSchemaType } from '~/schema/order'
import { OrderSchema } from '~/schema/order'
import MyTemplate from '~/server/service/templates/offline_success.vue'

export async function processOfflineOrder(event: H3Event, orderParams: OrderParamsSchemaType) {
  const config = useRuntimeConfig()
  const notion = new Client({ auth: config.notion.apiKey })

  const courseEvent = await getCourseEventByIdAsync(notion, orderParams.courseEventId, true)
  if (!courseEvent) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(ErrorCodes.NOT_FOUND, '該課程場次不存在')
  }
  if (!courseEvent.課程資訊_名稱 || !courseEvent.教室資訊 || !courseEvent.上課日期) {
    setResponseStatus(event, ErrorCodes.UNPROCESSABLE_ENTITY)
    return createApiError(ErrorCodes.UNPROCESSABLE_ENTITY, '該課程場次資訊有誤')
  }

  // 已截止報名
  const expirationDate = addDay(courseEvent.上課日期[2], -7)
  if (new Date() >= expirationDate) {
    setResponseStatus(event, ErrorCodes.UNPROCESSABLE_ENTITY)
    return createApiError(ErrorCodes.UNPROCESSABLE_ENTITY, `已截止報名 ${format({ date: expirationDate, format: 'YYYY/MM/DD', locale: 'zh-TW', tz: 'Asia/Taipei' })}`)
  }

  // 名額限制
  const limit = courseEvent.指定名額限制 ? courseEvent.指定名額限制 : courseEvent.教室資訊.名額限制 || 0
  const currentCount = courseEvent.報名人數 || 0
  if (currentCount >= limit) {
    setResponseStatus(event, ErrorCodes.UNPROCESSABLE_ENTITY)
    return createApiError(ErrorCodes.UNPROCESSABLE_ENTITY, '名額已滿')
  }

  const MerchantTradeNo = getTradeNo()
  const memberId = await getMemberIdAsync(notion, orderParams)

  const [year, month] = format({ date: new Date(), format: 'YYYY/MM', locale: 'zh-TW', tz: 'Asia/Taipei' }).split('/')
  const monthId = await getMonthIdAsync(notion, { year, month })

  const page = await notion.pages.create({
    parent: { database_id: config.notion.databaseId.orders },
    properties: {
      訂單編號: { type: 'title', title: [{ type: 'text', text: { content: MerchantTradeNo } }] },
      會員: { type: 'relation', relation: [{ id: memberId }] },
      課程資訊: { type: 'relation', relation: [{ id: courseEvent.課程! }] },
      課程場次: { type: 'relation', relation: [{ id: courseEvent.PAGE_ID! }] },
      講師: { type: 'relation', relation: courseEvent.講師.map((id) => ({ id: id! })) },
      月份: { type: 'relation', relation: [{ id: monthId }] },
      付款金額: { type: 'number', number: courseEvent.指定價格 || courseEvent.課程資訊_價格! },
      訂單狀態: { status: { name: '金流:待現金付款' } },
    },
  })
  const parsedPage = NotionPageSchema.parse(page)
  const order = OrderSchema.parse(parsedPage.properties)
  order.課程場次資訊 = await getCourseEventByIdAsync(notion, order.課程場次ID!, false)

  await sendEmail(notion, page.id, order)

  return createApiResponse(200, 'OK', MerchantTradeNo)
}

async function sendEmail(notion: Client, order_page_id: string, order: OrderSchemaType) {
  const config = useRuntimeConfig()

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
        paymentDate: format({ date: new Date(), format: 'YYYY/MM/DD', locale: 'zh-TW', tz: 'Asia/Taipei' }),
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
