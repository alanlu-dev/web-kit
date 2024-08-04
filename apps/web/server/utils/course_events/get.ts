import { type Client, isFullPage } from '@notionhq/client'
import { kv } from '@vercel/kv'
import type { CourseEventSchemaType } from '~/schema/course_event'
import { CourseEventSchema, courseEventFilters, courseEventKey, courseEventQuery } from '~/schema/course_event'

export async function getCourseEventByIdAsync(notion: Client | null, id: number, refresh: boolean | undefined = false): Promise<CourseEventSchemaType | null> {
  if (!id) return null

  const key = `${courseEventKey}:${id}`

  if (!refresh) {
    const item = await kv.get<CourseEventSchemaType>(key)

    if (item) {
      console.log('cache hit', key)

      if (item.課程ID) item.課程 = await getCourseByIdAsync(notion, item.課程ID)
      if (item.教室ID) item.教室 = await getClassroomByIdAsync(notion, item.教室ID)

      return item
    }
  }

  const item = await fetchNotionDataByIdAsync<CourseEventSchemaType>(notion, courseEventQuery, courseEventFilters, id, processCourseEventDataAsync)

  if (item) {
    await kv.set(key, item)

    if (item.課程ID) item.課程 = await getCourseByIdAsync(notion, item.課程ID)
    if (item.教室ID) item.教室 = await getClassroomByIdAsync(notion, item.教室ID)
  }

  return item
}

export async function getCourseEventsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<CourseEventSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheIdAsync<CourseEventSchemaType>(courseEventKey, currentPage, pageSize)
    if (items !== null) {
      await Promise.all(
        items.map(async (item) => {
          const coursePromise = item.課程ID ? getCourseByIdAsync(notion, item.課程ID) : Promise.resolve(null)
          const classroomPromise = item.教室ID ? getClassroomByIdAsync(notion, item.教室ID) : Promise.resolve(null)

          const [course, classroom] = await Promise.all([coursePromise, classroomPromise])

          if (course) item.課程 = course
          if (classroom) item.教室 = classroom
        }),
      )

      return items
    }
  }
  const items = await fetchNotionDataAsync<CourseEventSchemaType>(notion, { ...courseEventQuery, page_size: pageSize }, processCourseEventDataAsync)

  await kv.del(courseEventKey)
  items.map(async (item) => {
    await kv.rpush(courseEventKey, item.ID)
    await kv.set(`${courseEventKey}:${item.ID}`, item)
  })

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  await Promise.all(
    pageData.map(async (item) => {
      const coursePromise = item.課程ID ? getCourseByIdAsync(notion, item.課程ID) : Promise.resolve(null)
      const classroomPromise = item.教室ID ? getClassroomByIdAsync(notion, item.教室ID) : Promise.resolve(null)

      const [course, classroom] = await Promise.all([coursePromise, classroomPromise])

      if (course) item.課程 = course
      if (classroom) item.教室 = classroom
    }),
  )

  return pageData
}

export async function processCourseEventDataAsync(item: any, notion?: Client): Promise<CourseEventSchemaType | null> {
  if (!item || !isFullPage(item) || !notion) return null

  const parseItem = CourseEventSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id.replaceAll('-', '')

  return parseItem
}
