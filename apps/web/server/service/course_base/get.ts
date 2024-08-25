import { type Client, isFullPage } from '@notionhq/client'
import type { CourseBaseSchemaType } from '~/schema/course_base'
import { CourseBaseSchema, courseBaseFilters, courseBaseKey, courseBaseQuery } from '~/schema/course_base'

export async function getCourseBaseByIdAsync(notion: Client | null, id: number, refresh: boolean): Promise<CourseBaseSchemaType | null> {
  if (!id) return null

  const key = `${courseBaseKey}:${id}`

  let item: CourseBaseSchemaType | null = null

  if (!refresh) {
    item = await redis.get<CourseBaseSchemaType>(key)
  }

  if (!item) {
    ;[item] = await fetchNotionDataByIdAsync<CourseBaseSchemaType>({
      notion,
      query: courseBaseQuery,
      processData: processCourseBaseDataAsync,
      updatePages: updateRefreshTime,
      filters: courseBaseFilters,
      id,
    })
    if (item) await redis.set(key, item)
  }
  return item
}

export async function getCourseBasesAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<CourseBaseSchemaType[]> {
  let items: CourseBaseSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<CourseBaseSchemaType>(courseBaseKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<CourseBaseSchemaType>({
      notion,
      query: { ...courseBaseQuery, page_size: pageSize },
      processData: processCourseBaseDataAsync,
      updatePages: updateRefreshTime,
    })

    if (items.length) {
      await redis.del(courseBaseKey)
      items.map(async (item) => {
        await redis.rPush(courseBaseKey, item.ID)
        await redis.set(`${courseBaseKey}:${item.ID}`, item)
      })

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  return items
}

export async function processCourseBaseDataAsync(_: Client, item: any): Promise<CourseBaseSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: CourseBaseSchemaType = CourseBaseSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  return parseItem
}
