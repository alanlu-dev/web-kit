import { type Client, isFullPage } from '@notionhq/client'
import { getCourseByIdAsync } from '~/server/service/course/get'
import { getClassroomByIdAsync } from '~/server/service/classroom/get'
import type { CourseEventSchemaType } from '~/schema/course_event'
import { CourseEventSchema, courseEventFilters, courseEventKey, courseEventQuery } from '~/schema/course_event'

interface needType {
  needCourse: boolean
}

export async function getCourseEventByIdAsync(notion: Client | null, id: number, refresh: boolean, need: needType = { needCourse: true }): Promise<CourseEventSchemaType | null> {
  if (!id) return null

  const key = `${courseEventKey}:${id}`

  let item: CourseEventSchemaType | null = null

  if (!refresh) {
    item = await redis.get<CourseEventSchemaType>(key)
  }

  if (!item) {
    item = await fetchNotionDataByIdAsync<CourseEventSchemaType>(notion, courseEventQuery, courseEventFilters, id, processCourseEventDataAsync)
    if (item) await redis.set(key, item)
  }

  if (item) {
    item = await processCourseEventRelationAsync(notion, item, need)
  }

  return item
}

export async function getCourseEventsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean, need: needType = { needCourse: true }): Promise<CourseEventSchemaType[]> {
  let items: CourseEventSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<CourseEventSchemaType>(courseEventKey, currentPage, pageSize)
  }

  if (items === null) {
    items = await fetchNotionDataAsync<CourseEventSchemaType>(notion, { ...courseEventQuery, page_size: pageSize }, processCourseEventDataAsync)

    if (items.length) {
      await redis.del(courseEventKey)
      items.map(async (item) => {
        await redis.rPush(courseEventKey, item.ID)
        await redis.set(`${courseEventKey}:${item.ID}`, item)
      })

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  items = await Promise.all(items.map((item) => processCourseEventRelationAsync(notion, item, need)))
  return items
}

export async function fetchCourseEvents(notion: Client | null, courseEventIds: number[], need: needType = { needCourse: true }): Promise<CourseEventSchemaType[]> {
  const uniqueCourseEventIds = Array.from(new Set(courseEventIds))

  const courseEventPromises = uniqueCourseEventIds.map((id) => getCourseEventByIdAsync(notion, id, false, need))

  const courseEvents = await Promise.all(courseEventPromises)
  return courseEvents.filter((events): events is CourseEventSchemaType => events != null)
}

export async function processCourseEventDataAsync(notion: Client | null, item: any): Promise<CourseEventSchemaType | null> {
  if (!item || !isFullPage(item) || !notion) return null

  const parseItem = CourseEventSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')

  return parseItem
}

export async function processCourseEventRelationAsync(notion: Client | null, item: CourseEventSchemaType, need: needType = { needCourse: true }): Promise<CourseEventSchemaType> {
  const coursePromise = item.課程ID && need.needCourse ? getCourseByIdAsync(notion, item.課程ID, false, { needCourseEvents: false, needInstructor: false }) : Promise.resolve(null)
  const classroomPromise = item.教室ID ? getClassroomByIdAsync(notion, item.教室ID, false) : Promise.resolve(null)

  const [course, classroom] = await Promise.all([coursePromise, classroomPromise])

  if (course) {
    item.課程資訊_名稱 = course.課程名稱
    item.課程資訊_價格 = course.價格
  }
  if (classroom) item.教室資訊 = classroom

  return item
}
