import type { Client } from '@notionhq/client'
import { retry } from '~/server/utils/retry'

export async function getMonthIdAsync(notion: Client, data: { year: string; month: string }): Promise<string> {
  const config = useRuntimeConfig()

  // 尋找月份是否已經存在
  const queryMonth = await retry(() =>
    notion.databases.query({
      database_id: config.notion.databaseId.months,
      filter: {
        and: [
          { property: '年月', title: { equals: `${data.year}-${data.month}` } },
          { property: '年', number: { equals: +data.year } },
          { property: '月', select: { equals: data.month } },
        ],
      },
    }),
  )

  // 如果月份不存在，則新增月份
  let monthId = queryMonth.results[0]?.id
  if (!monthId) {
    const page = await retry(() =>
      notion.pages.create({
        parent: { database_id: config.notion.databaseId.months },
        properties: {
          年月: { type: 'title', title: [{ type: 'text', text: { content: `${data.year}-${data.month}` } }] },
          年: { type: 'number', number: +data.year },
          月: { type: 'select', select: { name: data.month } },
        },
      }),
    )
    monthId = page.id
  }

  return monthId
}
