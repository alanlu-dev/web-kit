import { NotionPageSchema } from '@alanlu-dev/notion-api-zod-schema'
import { type Client, isFullPage } from '@notionhq/client'
import type { CourseSchemaType } from '~/schema/course'
import { AchievementSchema, CourseSchema, FeaturesSchema, LearnSchema, OutlineSchema, PreparationSchema, courseFilters, courseKey, courseQuery } from '~/schema/course'

interface needType {
  needCourseEvents?: boolean
  needInstructor?: boolean
}

export async function getCourseByIdAsync(notion: Client | null, id: number, refresh: boolean, need: needType = { needCourseEvents: true, needInstructor: true }): Promise<CourseSchemaType | null> {
  if (!id) return null

  const key = `${courseKey}:${id}`

  let item: CourseSchemaType | null = null

  if (!refresh) {
    item = await redis.get<CourseSchemaType>(key)
  }

  if (!item) {
    item = await fetchNotionDataByIdAsync<CourseSchemaType>(notion, courseQuery, courseFilters, id, processCourseDataAsync)
    if (item) await redis.set(key, item)
  }

  if (item) {
    item = await processCourseRelationAsync(notion, item, need)
  }

  return item
}

export async function getCoursesAsync(
  notion: Client | null,
  currentPage: number,
  pageSize: number,
  refresh: boolean,
  need: needType = { needCourseEvents: true, needInstructor: true },
): Promise<CourseSchemaType[]> {
  let items: CourseSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<CourseSchemaType>(courseKey, currentPage, pageSize)
  }

  if (items === null) {
    items = await fetchNotionDataAsync<CourseSchemaType>(notion, { ...courseQuery, page_size: pageSize }, processCourseDataAsync)

    if (items.length) {
      await redis.del(courseKey)
      items.map(async (item) => {
        await redis.rPush(courseKey, item.ID)
        await redis.set(`${courseKey}:${item.ID}`, item)
      })

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  items = await Promise.all(items.map((item) => processCourseRelationAsync(notion, item, need)))
  return items
}

export async function processCourseDataAsync(notion: Client | null, item: any): Promise<CourseSchemaType | null> {
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
      .filter((item) => item != null)
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
      .filter((item) => item != null)
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
      .filter((item) => item != null)
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
      .filter((item) => item != null)
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
      .filter((item) => item != null)
      .sort((a, b) => {
        if (a.排序 == null && b.排序 == null) return 0
        if (a.排序 == null) return 1
        if (b.排序 == null) return -1
        return a.排序 - b.排序
      })
  }
  return parseItem
}

export async function processCourseRelationAsync(notion: Client | null, item: CourseSchemaType, need: needType = { needCourseEvents: true, needInstructor: true }): Promise<CourseSchemaType> {
  const courseEventsPromise = item.課程安排ID && need.needCourseEvents ? fetchCourseEvents(notion, item.課程安排ID, { needCourse: false }) : Promise.resolve([])
  const instructorPromise = item.講師ID && need.needInstructor ? fetchInstructors(notion, item.講師ID, false) : Promise.resolve(null)

  const [courseEvents, instructor] = await Promise.all([courseEventsPromise, instructorPromise])

  if (courseEvents) {
    item.課程安排資訊 = courseEvents
      .filter((events) => {
        // 要判斷當前日期是否在課程日期前一天之前，以確定是否可以報名
        return events.上課日期 && new Date() < new Date(new Date(events.上課日期[2]).getTime() - 24 * 60 * 60 * 1000)
      })
      .sort((a, b) => {
        if (a.上課日期 && b.上課日期) return new Date(a.上課日期[2]).getTime() - new Date(b.上課日期[2]).getTime()
        return 0
      })
  }
  if (instructor) item.講師資訊 = instructor

  return item
}
