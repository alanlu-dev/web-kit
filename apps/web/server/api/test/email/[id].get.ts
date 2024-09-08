import { render } from '@vue-email/render'
import { addDay, format } from '@formkit/tempo'
import { getOrderByIdAsync } from '~/server/service/order/get'
import MyTemplate from '~/server/service/templates/offline_success.vue'

export default defineWrappedResponseHandler(async (event) => {
  const config = useRuntimeConfig()

  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, ErrorCodes.BAD_REQUEST)
    return createApiError(event.node.res.statusCode, '請傳入合作夥伴編號')
  }

  const order = await getOrderByIdAsync(null, +id)
  if (!order) {
    setResponseStatus(event, ErrorCodes.NOT_FOUND)
    return createApiError(event.node.res.statusCode, '找不到該訂單')
  }

  const html = await render(
    MyTemplate,
    {
      siteUrl: config.public.siteUrl,
      siteName: config.public.siteName,
      payPlace: '中華民國職業清潔認證協會',
      payAddress: '台中市北屯區遼陽四街 65 號',
      courseName: order.課程場次資訊!.課程資訊_名稱!,
      courseLink: `${config.public.siteUrl}/course/${order.課程場次資訊?.課程ID}`,
      studentName: maskName(order.會員名稱),
      orderNumber: order.訂單編號!,
      courseDate: order.課程場次資訊!.上課日期![0]!,
      courseTime: order.課程場次資訊!.上課日期![1]!,
      deathLine: order.付款期限!,
      // 課程⽇期減 7 天
      courseDateMinus7: format({ date: addDay(order.課程場次資訊!.上課日期![2]!, -7), format: 'YYYY/MM/DD', locale: 'zh-TW', tz: 'Asia/Taipei' }),
      courseLocation: order.課程場次資訊!.教室資訊!.地址!,
    },
    {
      pretty: true,
    },
  )
  return html
})
