import { APIErrorCode, Client, ClientErrorCode, isFullPage, isNotionClientError } from '@notionhq/client'
import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { kv } from '@vercel/kv'
import type { CourseSchemaType } from '~/schema/course'
import { AchievementSchema, CourseSchema, FeaturesSchema, LearnSchema, OutlineSchema, PreparationSchema } from '~/schema/course'

export default defineEventHandler<{ query: { page?: string; page_size?: string; refresh?: boolean } }>(async (event) => {
  const { page, page_size, refresh } = getQuery(event)

  const currentPage = page ? Number.parseInt(page) : 1
  const pageSize = page_size ? Number.parseInt(page_size) : 10

  const key = `courses`

  try {
    if (!refresh) {
      const data = await kv.lrange(key, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
      if (data.length) {
        console.log('cache hit', key)
        return data
      }
      else if (currentPage > 1) {
        return data
      }
    }
    else {
      await kv.del(key)
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    const allData: CourseSchemaType[] = []
    let start_cursor: string | undefined

    while (true) {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID_COURSES!,
        start_cursor,
        page_size: pageSize,
        filter: {
          and: [
            { property: '封存', checkbox: { equals: false } },
            { property: '發布狀態', status: process.env.VERCEL_ENV === 'production' ? { equals: '發布' } : { does_not_equal: '草稿' } },
          ],
        },
        filter_properties: [
          /** 排序 */
          '%3DZD%5B',
          /** 課程名稱 */
          'title',
          /** 標籤 */
          'tQU%7C',
          /** 課程照片 */
          'r%3ENY',
          /** 影音連結 */
          'dB~z',
          /** 價格 */
          'zWJ%7D',
          /** 單元數 */
          'sRKp',
          /** 課程時長 */
          'lnDC',
          /** 結業人數 */
          'eJ%7Cg',
          /** 講師 */
          '%5CjaO',
          /** 課程特色 */
          'upg%60',
          /** 可以學到 */
          '_neS',
          /** 課程大綱 */
          '%3DBjz',
          /** 課前準備 */
          'OtrS',
          /** 結業獲得 */
          'p%3CWn',
        ],
        sorts: [{ property: '排序', direction: 'descending' }],
      })

      const allDataPromises = response.results.map(async (item) => {
        if (!isFullPage(item)) return null
        const parseItem = CourseSchema.parse(item.properties)
        parseItem.ID = item.id.replaceAll('-', '')

        // 處理課程特色
        if (parseItem.課程特色?.length) {
          const featuresPromises = parseItem.課程特色.map(async (id) => {
            const page = await notion.pages.retrieve({ page_id: id! })
            const parsedPage = FeaturesSchema.parse(NotionPageSchema.parse(page).properties)
            parsedPage.ID = id!.replaceAll('-', '')
            return parsedPage
          })
          parseItem.課程特色資訊 = (await Promise.all(featuresPromises))
            .filter((item) => item !== null)
            .sort((a, b) => {
              if (a.排序 == null && b.排序 == null) return 0
              if (a.排序 == null) return 1
              if (b.排序 == null) return -1
              return a.排序 - b.排序
            })
        }

        // 處理可以學到
        if (parseItem.可以學到?.length) {
          const learnPromises = parseItem.可以學到.map(async (id) => {
            const page = await notion.pages.retrieve({ page_id: id! })
            const parsedPage = LearnSchema.parse(NotionPageSchema.parse(page).properties)
            parsedPage.ID = id!.replaceAll('-', '')
            return parsedPage
          })
          parseItem.可以學到資訊 = (await Promise.all(learnPromises))
            .filter((item) => item !== null)
            .sort((a, b) => {
              if (a.排序 == null && b.排序 == null) return 0
              if (a.排序 == null) return 1
              if (b.排序 == null) return -1
              return a.排序 - b.排序
            })
        }

        // 處理課程大綱
        if (parseItem.課程大綱?.length) {
          const outlinePromises = parseItem.課程大綱.map(async (id) => {
            const page = await notion.pages.retrieve({ page_id: id! })
            const parsedPage = OutlineSchema.parse(NotionPageSchema.parse(page).properties)
            parsedPage.ID = id!.replaceAll('-', '')
            return parsedPage
          })
          parseItem.課程大綱資訊 = (await Promise.all(outlinePromises))
            .filter((item) => item !== null)
            .sort((a, b) => {
              if (a.排序 == null && b.排序 == null) return 0
              if (a.排序 == null) return 1
              if (b.排序 == null) return -1
              return a.排序 - b.排序
            })
        }

        // 處理課前準備
        if (parseItem.課前準備?.length) {
          const preparationPromises = parseItem.課前準備.map(async (id) => {
            const page = await notion.pages.retrieve({ page_id: id! })
            const parsedPage = PreparationSchema.parse(NotionPageSchema.parse(page).properties)
            parsedPage.ID = id!.replaceAll('-', '')
            return parsedPage
          })
          parseItem.課前準備資訊 = (await Promise.all(preparationPromises))
            .filter((item) => item !== null)
            .sort((a, b) => {
              if (a.排序 == null && b.排序 == null) return 0
              if (a.排序 == null) return 1
              if (b.排序 == null) return -1
              return a.排序 - b.排序
            })
        }

        // 處理結業獲得
        if (parseItem.結業獲得?.length) {
          const achievementPromises = parseItem.結業獲得.map(async (id) => {
            const page = await notion.pages.retrieve({ page_id: id! })
            const parsedPage = AchievementSchema.parse(NotionPageSchema.parse(page).properties)
            parsedPage.ID = id!.replaceAll('-', '')
            return parsedPage
          })
          parseItem.結業獲得資訊 = (await Promise.all(achievementPromises))
            .filter((item) => item !== null)
            .sort((a, b) => {
              if (a.排序 == null && b.排序 == null) return 0
              if (a.排序 == null) return 1
              if (b.排序 == null) return -1
              return a.排序 - b.排序
            })
        }

        parseItem.課程照片 = parseItem.課程照片.map((img) => mapImgUrl(img, item.id))
        return parseItem
      })

      const data = (await Promise.all(allDataPromises)).filter((item) => item !== null)
      allData.push(...data)

      if (!response.has_more) {
        break
      }

      start_cursor = response.next_cursor!
    }

    await kv.rpush(key, ...allData)

    allData.map(async (item) => {
      await kv.set(`${key}:${item.ID}`, item)
    })

    const currentPageData = allData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return currentPageData
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
