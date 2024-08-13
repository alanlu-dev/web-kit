import { Client } from '@notionhq/client'
import type { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

export async function fetchNotionDataAsync<T>(notion: Client | null, query: QueryDatabaseParameters, processData: (notion: Client | null, item: any) => Promise<T | null>): Promise<T[]> {
  const allResult: QueryDatabaseResponse['results'] = []
  let start_cursor: string | undefined

  console.log('fetchNotionDataAsync', query)
  if (!notion) {
    notion = new Client({ auth: useRuntimeConfig().notion.apiKey })
  }

  while (true) {
    const response = await notion.databases.query({ ...query, start_cursor })

    allResult.push(...response.results)

    if (!response.has_more) {
      break
    }

    start_cursor = response.next_cursor!
  }

  // return allResult
  const allDataPromises = allResult.map(async (item) => processData(notion, item))
  const allData = (await Promise.all(allDataPromises)).filter((item) => item != null)

  return allData
}

export async function fetchNotionDataByIdAsync<T>(
  notion: Client | null,
  query: QueryDatabaseParameters,
  filters: AndFilterType,
  id: number,
  processDataAsync: (notion: Client | null, item: any) => Promise<T | null>,
): Promise<T> {
  const allData = await fetchNotionDataAsync<T>(
    notion,
    {
      ...query,
      filter: { and: [...filters, { property: 'ID', unique_id: { equals: +id } }] },
    },
    processDataAsync,
  )

  return allData[0]
}
