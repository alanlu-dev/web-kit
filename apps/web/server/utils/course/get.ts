import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { type Client, isFullPage } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { CourseSchemaType } from '~/schema/course'
import { AchievementSchema, CourseSchema, FeaturesSchema, LearnSchema, OutlineSchema, PreparationSchema, courseFilters, courseKey, courseQuery } from '~/schema/course'

export async function getCourseByIdAsync(notion: Client | null, id: number, refresh: boolean | undefined = false): Promise<CourseSchemaType | null> {
  if (!id) return null

  const key = `${courseKey}:${id}`

  if (!refresh) {
    const item = await kv.get<CourseSchemaType>(key)

    if (item) {
      console.log('cache hit', key)

      if (!item.講師資訊) item.講師資訊 = []

      const instructorInfos = await fetchInstructorInfos(notion, item.講師ID)
      item.講師資訊!.push(...instructorInfos)

      return item
    }
  }

  const item = await fetchNotionDataByIdAsync<CourseSchemaType>(notion, courseQuery, courseFilters, id, processCourseDataAsync)

  if (item) {
    await kv.set(key, item)

    if (!item.講師資訊) item.講師資訊 = []

    const instructorInfos = await fetchInstructorInfos(notion, item.講師ID)
    item.講師資訊!.push(...instructorInfos)
  }

  return item
}

export async function getCoursesAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<CourseSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheIdAsync<CourseSchemaType>(courseKey, currentPage, pageSize)
    if (items !== null) return items
  }
  const items = await fetchNotionDataAsync<CourseSchemaType>(notion, { ...courseQuery, page_size: pageSize }, processCourseDataAsync)

  await kv.del(courseKey)
  items.map(async (item) => {
    await kv.rpush(courseKey, item.ID)
    await kv.set(`${courseKey}:${item.ID}`, item)
  })

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return pageData
}

export async function processCourseDataAsync(item: any, notion?: Client): Promise<CourseSchemaType | null> {
  if (!item || !isFullPage(item) || !notion) return null

  const parseItem: CourseSchemaType = CourseSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')
  parseItem.課程照片 = parseItem.課程照片.map((img) => mapImgUrl(img, item.id))

  // 處理課程特色
  if (parseItem.課程特色?.length) {
    const featuresPromises = parseItem.課程特色.map(async (id) => {
      const page = await notion.pages.retrieve({ page_id: id! })
      const parsedPage = FeaturesSchema.parse(NotionPageSchema.parse(page).properties)
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
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
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
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
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
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
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
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
      parsedPage.PAGE_ID = id!.replaceAll('-', '')
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
  return parseItem
}
