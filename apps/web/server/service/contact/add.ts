import { Client } from '@notionhq/client'
import type { ContactSchemaType } from '~/schema/contact'
import { getMemberIdAsync } from '~/server/service/member/get'
import { retry } from '~/server/utils/retry'

export async function addContactAsync(data: ContactSchemaType) {
  const config = useRuntimeConfig()
  const notion = new Client({ auth: config.notion.apiKey })

  const memberId = await getMemberIdAsync(notion, data)

  // 新增聯絡紀錄
  const page = await retry(() =>
    notion.pages.create({
      parent: { database_id: config.notion.databaseId.contacts },
      properties: {
        主旨: { type: 'title', title: [{ type: 'text', text: { content: data.title } }] },
        問題描述: { type: 'rich_text', rich_text: [{ type: 'text', text: { content: data.message } }] },
        會員: { type: 'relation', relation: [{ id: memberId }] },
      },
    }),
  )

  return page.id
}
