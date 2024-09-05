import { Client, isFullPage } from '@notionhq/client'

export default defineWrappedResponseHandler(async (event) => {
  const config = useRuntimeConfig()
  const key = getRouterParam(event, 'key') as keyof typeof config.notion.databaseId

  if (!config.public.isDev) {
    return config.public.version
  }

  const notion = new Client({ auth: config.notion.apiKey })
  const page = await notion.databases.query({
    page_size: 1,
    database_id: config.notion.databaseId[key],
  })

  if (isFullPage(page.results[0])) {
    return page.results[0].properties
  }

  return {}
})
