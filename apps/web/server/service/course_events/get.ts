import { type Client, isFullPage } from '@notionhq/client'
import type { CourseEventSchemaType } from '~/schema/course_event'
import { courseEventFilters, courseEventKey, courseEventQuery, CourseEventSchema } from '~/schema/course_event'
import { getClassroomByIdAsync } from '~/server/service/classroom/get'
import { getCourseByIdAsync } from '~/server/service/course/get'

interface needType {
  needCourse?: boolean
  needClassroom?: boolean
}

export async function getCourseEventByIdAsync(
  notion: Client | null,
  id: number,
  refresh: boolean,
  need: needType = { needCourse: true, needClassroom: true },
  page_size: number = 0,
): Promise<CourseEventSchemaType | null> {
  if (!id) return null

  const key = `${courseEventKey}:${id}`

  let item: CourseEventSchemaType | null = null

  if (!refresh) {
    item = await redis.get<CourseEventSchemaType>(key)
  }

  if (!item) {
    ;[item, notion] = await fetchNotionDataByIdAsync<CourseEventSchemaType>({
      notion,
      query: page_size ? { ...courseEventQuery, page_size } : courseEventQuery,
      processData: processCourseEventDataAsync,
      updateProperties: updateRefreshTime,
      filters: courseEventFilters,
      id,
    })
    if (item) await redis.set(key, item)
  }

  if (item) {
    item = await processCourseEventRelationAsync(notion, item, need)
  }

  return item
}

export async function getCourseEventsAsync(
  notion: Client | null,
  currentPage: number,
  pageSize: number,
  refresh: boolean,
  need: needType = { needCourse: true, needClassroom: true },
): Promise<CourseEventSchemaType[]> {
  let items: CourseEventSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<CourseEventSchemaType>(courseEventKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items, notion] = await fetchNotionDataAsync<CourseEventSchemaType>({
      notion,
      query: { ...courseEventQuery, page_size: pageSize },
      processData: processCourseEventDataAsync,
      updateProperties: updateRefreshTime,
    })

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

export async function fetchCourseEvents(
  notion: Client | null,
  courseEventIds: number[],
  need: needType = { needCourse: true, needClassroom: true },
  page_size: number = 0,
): Promise<CourseEventSchemaType[]> {
  const uniqueCourseEventIds = Array.from(new Set(courseEventIds))

  const courseEventPromises = uniqueCourseEventIds.map((id) => getCourseEventByIdAsync(notion, id, false, need, page_size))

  const courseEvents = await Promise.all(courseEventPromises)
  return courseEvents.filter((events): events is CourseEventSchemaType => events != null)
}

export async function processCourseEventDataAsync(_: Client, item: any): Promise<CourseEventSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem = CourseEventSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')

  return parseItem
}

export async function processCourseEventRelationAsync(notion: Client | null, item: CourseEventSchemaType, need: needType = { needCourse: true, needClassroom: true }): Promise<CourseEventSchemaType> {
  const coursePromise = item.課程ID && need.needCourse ? getCourseByIdAsync(notion, item.課程ID, false, { needCourseEvents: false, needInstructor: false }) : Promise.resolve(null)
  const classroomPromise = item.教室ID && need.needClassroom ? getClassroomByIdAsync(notion, item.教室ID, false) : Promise.resolve(null)

  const [course, classroom] = await Promise.all([coursePromise, classroomPromise])

  if (course) {
    item.課程資訊_名稱 = course.名稱
    item.課程資訊_價格 = course.價格
    item.課程資訊_型態 = course.課程型態
  }
  if (classroom) item.教室資訊 = classroom

  return item
}
