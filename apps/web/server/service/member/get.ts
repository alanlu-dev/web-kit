import type { Client } from '@notionhq/client'
import type { MemberSchemaType } from '~/schema/member'

export async function getMemberIdAsync(notion: Client, data: MemberSchemaType): Promise<string> {
  const config = useRuntimeConfig()

  // 尋找會員是否已經存在
  const queryMember = await notion.databases.query({
    database_id: config.notion.databaseId.members,
    filter: {
      and: [
        { property: '名稱', title: { equals: data.name } },
        { property: '信箱', email: { equals: data.email } },
        { property: '手機', phone_number: { equals: data.mobile } },
      ],
    },
  })

  // 如果會員不存在，則新增會員
  let memberId = queryMember.results[0]?.id
  if (!memberId) {
    const page = await notion.pages.create({
      parent: { database_id: config.notion.databaseId.members },
      properties: {
        名稱: { type: 'title', title: [{ type: 'text', text: { content: data.name } }] },
        信箱: { type: 'email', email: data.email },
        手機: { type: 'phone_number', phone_number: data.mobile },
      },
    })
    memberId = page.id
  }

  return memberId
}
