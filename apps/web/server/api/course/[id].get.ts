import { APIErrorCode, Client, ClientErrorCode, isNotionClientError } from '@notionhq/client'
import { NotionBlockSchema, NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { CourseSchema } from '~/schema/course'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) return null

    const page = await notion.pages.retrieve({ page_id: id })
    const contents = await notion.blocks.children.list({ block_id: id })

    const parsedPage = NotionPageSchema.parse(page)
    const parsedContents = NotionBlockSchema.array().parse(contents.results)

    return {
      page: CourseSchema.parse(parsedPage.properties),
      contents: parsedContents,
    }
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
