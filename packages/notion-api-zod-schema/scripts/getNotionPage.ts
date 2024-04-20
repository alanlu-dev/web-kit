import type { NotionPageWithContentsType } from '../src/index'
import { NotionPageSchema } from '../src/index'
import { NotionBlockSchema } from '../src/NotionBlockSchema'
import { notion } from './notionClient'

export async function getNotionPage(pageId: string): Promise<NotionPageWithContentsType> {
  const page = await notion.pages.retrieve({ page_id: pageId })
  const contents = await notion.blocks.children.list({ block_id: pageId })

  // 將 page, content 使用 fs 輸出成 json 檔案 增加時間搓
  // fs.writeFileSync(`page-${new Date().getTime()}.json`, JSON.stringify(page, null, 2))
  // fs.writeFileSync(`content-${new Date().getTime()}.json`, JSON.stringify(contents, null, 2))

  const parsedPage = NotionPageSchema.parse(page)
  const parsedContents = NotionBlockSchema.array().parse(contents.results)

  return {
    ...parsedPage,
    contents: parsedContents,
  }
}
