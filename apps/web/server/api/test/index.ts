import { Client } from '@notionhq/client'
import { getOrderByIdAsync } from '~/server/service/order/get'

export default defineEventHandler(async () => {
  const notion = new Client({ auth: useRuntimeConfig().notion.apiKey })
  return getOrderByIdAsync(notion, 57)
})
