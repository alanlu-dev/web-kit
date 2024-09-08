import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'
import { format } from '@formkit/tempo'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { render } from '@vue-email/render'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'
import { getMemberIdAsync } from '~/server/service/member/get'
import { getOrderByMemberIdAsync } from '~/server/service/order/get'
import { getMonthIdAsync } from '~/server/service/month/get'
import type { OrderParamsSchemaType, OrderSchemaType } from '~/schema/order'
import { OrderSchema } from '~/schema/order'
import MyTemplate from '~/server/service/templates/free_success.vue'

export async function processFreeOrder(event: H3Event, orderParams: OrderParamsSchemaType) {
  const config = useRuntimeConfig()
  const notion = new Client({ auth: config.notion.apiKey })

  const courseEvent = await getCourseEventByIdAsync(notion, orderParams.courseEventId, true)
  if (!courseEvent) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(ErrorCodes.NOT_FOUND, '該課程場次不存在')
  }
  if (!courseEvent.課程資訊_名稱) {
    setResponseStatus(event, ErrorCodes.UNPROCESSABLE_ENTITY)
    return createApiError(ErrorCodes.UNPROCESSABLE_ENTITY, '該課程場次資訊有誤')
  }

  // 已報名
  const memberId = await getMemberIdAsync(notion, orderParams)
  const hasDuplicateMembers = await getOrderByMemberIdAsync(notion, courseEvent.PAGE_ID!, memberId)
  if (hasDuplicateMembers) {
    setResponseStatus(event, ErrorCodes.CONFLICT)
    return createApiError(
      ErrorCodes.CONFLICT,
      `已於 ${format({ date: hasDuplicateMembers.建立時間, format: 'YYYY/MM/DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' })} 報名`,
      hasDuplicateMembers.訂單編號,
    )
    // return createApiResponse(200, 'OK', hasDuplicateMembers.訂單編號)
  }

  const [year, month] = format({ date: new Date(), format: 'YYYY/MM', locale: 'zh-TW', tz: 'Asia/Taipei' }).split('/')
  const monthId = await getMonthIdAsync(notion, { year, month })

  const MerchantTradeNo = getTradeNo()
  const page = await notion.pages.create({
    parent: { database_id: config.notion.databaseId.orders },
    properties: {
      訂單編號: { type: 'title', title: [{ type: 'text', text: { content: MerchantTradeNo } }] },
      會員: { type: 'relation', relation: [{ id: memberId }] },
      課程資訊: { type: 'relation', relation: [{ id: courseEvent.課程! }] },
      課程場次: { type: 'relation', relation: [{ id: courseEvent.PAGE_ID! }] },
      月份: { type: 'relation', relation: [{ id: monthId }] },
      付款金額: { type: 'number', number: 0 },
      訂單狀態: { status: { name: '面試:待第一階段' } },
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
