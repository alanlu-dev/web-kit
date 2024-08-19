import { type Client, isFullPage } from '@notionhq/client'
import { addDay } from '@formkit/tempo'
import { getCourseBaseByIdAsync } from '../course_base/get'
import { fetchCourseEvents } from '~/server/service/course_events/get'
import { fetchInstructors } from '~/server/service/instructor/get'
import type { CourseSchemaType } from '~/schema/course'
import { CourseSchema, courseFilters, courseKey, courseQuery } from '~/schema/course'

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

  return parseItem
}

export async function processCourseRelationAsync(notion: Client | null, item: CourseSchemaType, need: needType = { needCourseEvents: true, needInstructor: true }): Promise<CourseSchemaType> {
  const courseBasePromise = item.課程基礎ID ? getCourseBaseByIdAsync(notion, item.課程基礎ID, false) : Promise.resolve(null)
  const courseEventsPromise = item.課程安排ID && need.needCourseEvents ? fetchCourseEvents(notion, item.課程安排ID, { needCourse: false, needClassroom: true }) : Promise.resolve([])
  const instructorPromise = item.可授課講師ID && need.needInstructor ? fetchInstructors(notion, item.可授課講師ID, false) : Promise.resolve(null)

  const [courseBase, courseEvents, instructor] = await Promise.all([courseBasePromise, courseEventsPromise, instructorPromise])

  if (courseBase) {
    item.課程基礎資訊 = courseBase
  }
  if (courseEvents) {
    item.課程安排資訊 = courseEvents
      .filter((events) => {
        // 要判斷當前日期是否在課程日期前7天之前，以確定是否可以報名
        return events.上課日期 && new Date() < addDay(events.上課日期[2], -1)
      })
      .sort((a, b) => {
        if (a.上課日期 && b.上課日期) return new Date(a.上課日期[2]).getTime() - new Date(b.上課日期[2]).getTime()
        return 0
      })
  }
  if (instructor) item.可授課講師資訊 = instructor

  return item
}
