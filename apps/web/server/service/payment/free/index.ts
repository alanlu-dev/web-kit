import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'
import { format } from '@formkit/tempo'
import { getCourseEventByIdAsync } from '~/server/service/course_events/get'
import { getMemberIdAsync } from '~/server/service/member/get'
import { getOrderByMemberIdAsync } from '~/server/service/order/get'
import { getMonthIdAsync } from '~/server/service/month/get'
import type { OrderParamsSchemaType } from '~/schema/order'

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
    return createApiResponse(
      ErrorCodes.CONFLICT,
      `已於 ${format({ date: hasDuplicateMembers.建立時間, format: 'YYYY/MM/DD HH:mm:ss', locale: 'zh-TW', tz: 'Asia/Taipei' })} 報名`,
      hasDuplicateMembers.訂單編號,
    )
    // return createApiResponse(200, 'OK', hasDuplicateMembers.訂單編號)
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
      月份: { type: 'relation', relation: [{ id: monthId }] },
      付款金額: { type: 'number', number: 0 },
      訂單狀態: { status: { name: '面試:待第一階段' } },
    },
  })

  return createApiResponse(200, 'OK', MerchantTradeNo)
}
