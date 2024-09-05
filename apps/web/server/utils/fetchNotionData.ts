import { Client } from '@notionhq/client'
import type { QueryDatabaseParameters, QueryDatabaseResponse, UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { addSecond, format } from '@formkit/tempo'

interface FetchNotionDataParams<T> {
  notion: Client | null
  query: QueryDatabaseParameters
  processData: (notion: Client, item: any) => Promise<T | null>
  updateProperties: (() => UpdatePageParameters['properties']) | null
}

export async function fetchNotionDataAsync<T>({ notion, query, processData, updateProperties }: FetchNotionDataParams<T>): Promise<[T[], Client]> {
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

  // 更新刷新時間
  if (updateProperties) {
    updatePages<T>(notion, allData, updateProperties)
  }

  return [allData, notion]
}

interface FetchNotionDataByIdParams<T> extends FetchNotionDataParams<T> {
  filters: AndFilterType
  id: number
}

export async function fetchNotionDataByIdAsync<T>({ notion, query, filters, id, processData, updateProperties }: FetchNotionDataByIdParams<T>): Promise<[T, Client]> {
  const [allData, client] = await fetchNotionDataAsync<T>({
    notion,
    query: {
      ...query,
      filter: { and: [...filters, { property: 'ID', unique_id: { equals: +id } }] },
    },
    processData,
    updateProperties,
  })

  return [allData[0], client]
}

function chunk(arr: any[], chunkSize: number) {
  const newChunk = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    newChunk.push(chunk)
  }
  return newChunk
}

/***
 * 更新頁面
 * @param pagesToUpdate: [pages]
 * @returns Promise
 */
export async function updatePages<T>(notion: Client, pagesToUpdate: T[], getProperties: () => UpdatePageParameters['properties']) {
  const pagesToUpdateChunks = chunk(pagesToUpdate, 10)

  for (const pagesToUpdateBatch of pagesToUpdateChunks) {
    await Promise.all(
      pagesToUpdateBatch.map(({ PAGE_ID }) => {
        const properties = getProperties()
        return notion.pages.update({ page_id: PAGE_ID, properties })
      }),
    )
  }
  if (pagesToUpdate.length === 0) {
    console.log('Notion Tasks are already up-to-date')
  }
  else {
    console.log(`Successfully updated ${pagesToUpdate.length} task(s) in Notion`)
  }
  return pagesToUpdate
}

export function updateRefreshTime(): UpdatePageParameters['properties'] {
  const refreshTime = format({
    date: addSecond(new Date(), 10),
    format: 'YYYY-MM-DD HH:mm:ss',
    locale: 'zh-TW',
    tz: 'Asia/Taipei',
  })
  return {
    刷新時間: {
      date: { start: refreshTime, time_zone: 'Asia/Taipei' },
    },
  }
}

export function updatePageRefreshTime(): UpdatePageParameters['properties'] {
  const refreshTime = format({
    date: addSecond(new Date(), 10),
    format: 'YYYY-MM-DD HH:mm:ss',
    locale: 'zh-TW',
    tz: 'Asia/Taipei',
  })
  return {
    刷新時間: {
      date: { start: refreshTime, time_zone: 'Asia/Taipei' },
    },
    刷新頁面時間: {
      date: { start: refreshTime, time_zone: 'Asia/Taipei' },
    },
  }
}
