import { Client } from '@notionhq/client'
import type { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { AndFilterType } from '~/types/notion'

export async function fetchNotionDataAsync<T>(notion: Client | null, query: QueryDatabaseParameters, processData: (item: any, notion?: Client) => Promise<T | null>): Promise<T[]> {
  const allResult: QueryDatabaseResponse['results'] = []
  let start_cursor: string | undefined

  console.log(query)
  if (!notion) {
    notion = new Client({ auth: process.env.NOTION_API_KEY })
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
  const allDataPromises = allResult.map(async (item) => processData(item, notion))
  const allData = (await Promise.all(allDataPromises)).filter((item) => item !== null)

  return allData
}

export async function fetchNotionDataByIdAsync<T>(
  notion: Client | null,
  query: QueryDatabaseParameters,
  filters: AndFilterType,
  id: number,
  processDataAsync: (item: any, notion?: Client) => Promise<T | null>,
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
