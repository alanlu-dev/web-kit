import { render } from '@vue-email/render'
import { formatThousand } from '@alanlu-dev/utils'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'
import { render as renderCSS } from '@master/css-server'
import config from '@jiehousekeeper/master-css-config'
import MyTemplate from '../templates/success.vue'
import { OrderSchema } from '~/schema/order'

function maskName(name: string | undefined): string {
  if (!name || name.length <= 1) {
    return '○'
  }
  const firstChar = name[0]
  const lastChar = name[name.length - 1]
  const maskedMiddle = '○'.repeat(name.length - 2)
  return `${firstChar}${maskedMiddle}${lastChar}`
}

export default defineEventHandler(async () => {
  const order_page_id = '2631ca84f39d4731ad51b636caf75fa8'

  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  // 新增聯絡紀錄
  const page = await notion.pages.update({
    page_id: order_page_id,
    properties: {
      付款狀態: { status: { name: '付款失敗' } },
    },
  })
  const parsedPage = NotionPageSchema.parse(page)
  const order = OrderSchema.parse(parsedPage.properties)
  order.課程安排資訊 = await getCourseEventByIdAsync(notion, order.課程安排ID!)

  const html = await render(
    MyTemplate,
    {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      courseName: order.課程安排資訊?.課程資訊?.課程名稱,
      courseLink: `${process.env.NUXT_PUBLIC_SITE_URL}/course_event/${order.課程安排ID}`,
      studentName: maskName(order.會員名稱),
      orderNumber: order.訂單編號,
      paymentAmount: `NT$ ${formatThousand(order.付款金額!)}`,
      paymentDate: new Date().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      courseDate: order.課程安排資訊!.上課日期![0]!,
      courseTime: order.課程安排資訊!.上課日期![1]!,
      // 課程⽇期減 7 天
      courseDateMinus7: new Date(new Date(order.課程安排資訊!.上課日期![2]!).getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      courseLocation: order.課程安排資訊?.教室資訊?.地址,
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
    subject: `恭喜！您已成功報名中華民國職業認證協會【${order.課程安排資訊?.課程資訊?.課程名稱}】`,
    html: rendered.html,
    to: order.會員信箱,
  })

  return emailResult
})
