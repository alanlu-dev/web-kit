import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'
import { addDay, format } from '@formkit/tempo'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'
import { getMemberIdAsync } from '~/server/service/member/get'
import { getMonthIdAsync } from '~/server/service/month/get'
import type { OrderParamsSchemaType } from '~/schema/order'

// 取得訂單編號
function getTradeNo(prefix = ''): string {
  const date = format({ date: new Date(), format: 'YYYYMMDDHHmmss', locale: 'zh-TW', tz: 'Asia/Taipei' })
  const randomNum = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0')

  return `${prefix}${date}${randomNum}`
}

export async function processEcPayOrder(event: H3Event, orderParams: OrderParamsSchemaType) {
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

  const ecPayPaymentOrder: ecpayPaymentOrder = {
    TotalAmount: (courseEvent.指定價格 || courseEvent.課程資訊_價格!).toString(),
    ItemName: courseEvent.課程資訊_名稱!,
    TradeDesc: '課程',
    // TradeDesc: `上課地點: ${courseEvent.教室資訊.地址}，上課時間：${courseEvent.上課日期[0]} ${courseEvent.上課日期[1]}`,
    ChoosePayment: ecpayPaymentType.enum.ALL,
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
      金流商: { type: 'select', select: { name: '綠界' } },
      特店編號: { type: 'number', number: +config.ecpay.merchantId },
      付款金額: { type: 'number', number: +ecPayPaymentOrder.TotalAmount },
    },
  })

  const paymentRequest = createEcPayPaymentRequest({
    MerchantTradeNo,
    paymentOrder: ecPayPaymentOrder,
    order_page_id: page.id, // ReturnURL
    course_event_id: orderParams.courseEventId, // ClientBackURL
  })
  return createApiResponse(200, 'OK', paymentRequest)
}
