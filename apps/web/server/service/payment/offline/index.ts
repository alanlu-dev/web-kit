import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'
import { addDay, format } from '@formkit/tempo'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'
import { getMemberIdAsync } from '~/server/service/member/get'
import { getOrderByMemberIdAsync } from '~/server/service/order/get'
import { getMonthIdAsync } from '~/server/service/month/get'
import type { OrderParamsSchemaType } from '~/schema/order'

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

  // 已報名
  const memberId = await getMemberIdAsync(notion, orderParams)
  const hasDuplicateMembers = await getOrderByMemberIdAsync(notion, courseEvent.PAGE_ID!, memberId)
  if (hasDuplicateMembers) {
    setResponseStatus(event, ErrorCodes.CONFLICT)
    return createApiResponse(
      ErrorCodes.CONFLICT,
      `已於 ${format({ date: hasDuplicateMembers.建立時間, format: 'YYYY/MM/DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' })} 報名`,
      hasDuplicateMembers.訂單編號,
    )
    // return createApiResponse(200, 'OK', hasDuplicateMembers.訂單編號)
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

  const [year, month] = format({ date: new Date(), format: 'YYYY/MM', locale: 'zh-TW', tz: 'Asia/Taipei' }).split('/')
  const monthId = await getMonthIdAsync(notion, { year, month })

  const MerchantTradeNo = getTradeNo()
  await notion.pages.create({
    parent: { database_id: config.notion.databaseId.orders },
    properties: {
      訂單編號: { type: 'title', title: [{ type: 'text', text: { content: MerchantTradeNo } }] },
      會員: { type: 'relation', relation: [{ id: memberId }] },
      課程資訊: { type: 'relation', relation: [{ id: courseEvent.課程! }] },
      課程場次: { type: 'relation', relation: [{ id: courseEvent.PAGE_ID! }] },
      講師: { type: 'relation', relation: courseEvent.講師.map((id) => ({ id: id! })) },
      月份: { type: 'relation', relation: [{ id: monthId }] },
      付款方式: { select: { name: '現金' } },
      付款金額: { type: 'number', number: courseEvent.指定價格 || courseEvent.課程資訊_價格! },
      付款期限: { type: 'date', date: { start: format({ date: addDay(new Date(), 3), format: 'YYYY-MM-DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' }), time_zone: 'Asia/Taipei' } },
      訂單狀態: { status: { name: '金流:待現金付款' } },
    },
  })

  return createApiResponse(200, 'OK', MerchantTradeNo)
}
