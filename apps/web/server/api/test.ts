import { Client } from '@notionhq/client'
import { type ReviewSchemaType, reviewFilters, reviewQuery } from '~/schema/review'

export default defineEventHandler(async () => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  return getOrderByIdAsync(notion, 57)
})
