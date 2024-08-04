import { type Client, isFullPage } from '@notionhq/client'
import type { ClassroomSchemaType } from '~/schema/classroom'
import { ClassroomSchema, classroomFilters, classroomKey, classroomQuery } from '~/schema/classroom'

export async function getClassroomByIdAsync(notion: Client | null, id: number, refresh: boolean | undefined = false): Promise<ClassroomSchemaType | null> {
  if (!id) return null

  const key = `${classroomKey}:${id}`

  if (!refresh) {
    const item = await redis.get<ClassroomSchemaType>(key)
    if (item) return item
  }

  const item = await fetchNotionDataByIdAsync<ClassroomSchemaType>(notion, classroomQuery, classroomFilters, id, processClassroomDataAsync)

  if (item) await redis.set(key, item)

  return item
}

export async function getClassroomsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean | undefined = false): Promise<ClassroomSchemaType[]> {
  if (!refresh) {
    const items = await fetchFromCacheIdAsync<ClassroomSchemaType>(classroomKey, currentPage, pageSize)
    if (items !== null) return items
  }
  const items = await fetchNotionDataAsync<ClassroomSchemaType>(notion, { ...classroomQuery, page_size: pageSize }, processClassroomDataAsync)

  await redis.del(classroomKey)
  items.map(async (item) => {
    await redis.rPush(classroomKey, item.ID)
    await redis.set(`${classroomKey}:${item.ID}`, item)
  })

  const pageData = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return pageData
}

export async function processClassroomDataAsync(item: any): Promise<ClassroomSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: ClassroomSchemaType = ClassroomSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  return parseItem
}
