import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'
import { NotionBlockSchema, NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { kv } from '@vercel/kv'
import { MemberSchema } from '~/schema/member'

export default defineEventHandler<{ query: { refresh?: boolean } }>(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return null

  const key = `member:${id}`

  const { refresh } = getQuery(event)
  if (!refresh) {
    const data = await kv.get(key)
    if (data) {
      console.log('cache hit', key)
      return data
    }
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const page = await notion.pages.retrieve({ page_id: id })
    const contents = await notion.blocks.children.list({ block_id: id })

    const parsedPage = MemberSchema.parse(NotionPageSchema.parse(page).properties)
    const parsedContents = NotionBlockSchema.array().parse(contents.results)

    const response = {
      page: parsedPage,
      contents: parsedContents,
    }

    // await kv.set(key, response, { ex: 300 })
    await kv.set(key, response)

    return response
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
