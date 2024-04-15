import type { NotionPageWithContentsType } from '../index'
import { NotionPageSchema } from '../index'
import { NotionBlockSchema } from '../src/NotionBlockSchema'
import { notion } from './notionClient'

export async function getNotionPage(pageId: string): Promise<NotionPageWithContentsType> {
  const page = await notion.pages.retrieve({ page_id: pageId })
  const contents = await notion.blocks.children.list({ block_id: pageId })

  const parsedPage = NotionPageSchema.parse(page)
  const parsedContents = NotionBlockSchema.array().parse(contents.results)

  return {
    ...parsedPage,
    contents: parsedContents,
  }
}
