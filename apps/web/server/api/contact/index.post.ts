import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'
import type { ContactSchemaType } from '~/schema/contact'

export default defineEventHandler<{ body: ContactSchemaType }>(async (event) => {
  const data = await readBody(event)

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const memberId = await getMemberIdAsync(notion, data)

    // 新增聯絡紀錄
    const page = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID_CONTACTS! },
      properties: {
        主旨: { type: 'title', title: [{ type: 'text', text: { content: data.title } }] },
        問題描述: { type: 'rich_text', rich_text: [{ type: 'text', text: { content: data.message } }] },
        會員: { type: 'relation', relation: [{ id: memberId }] },
      },
    })

    return page.id
  }
  catch (error: unknown) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          // ...
          break
        case APIErrorCode.ObjectNotFound:
          // ...
          break
        case APIErrorCode.Unauthorized:
          // ...
          break
      }
    }
    return error
  }
})
