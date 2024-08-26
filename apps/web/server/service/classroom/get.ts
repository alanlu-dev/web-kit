import { type Client, isFullPage } from '@notionhq/client'
import type { ClassroomSchemaType } from '~/schema/classroom'
import { ClassroomSchema, classroomFilters, classroomKey, classroomQuery } from '~/schema/classroom'

export async function getClassroomByIdAsync(notion: Client | null, id: number, refresh: boolean): Promise<ClassroomSchemaType | null> {
  if (!id) return null

  const key = `${classroomKey}:${id}`

  let item: ClassroomSchemaType | null = null

  if (!refresh) {
    item = await redis.get<ClassroomSchemaType>(key)
  }

  if (!item) {
    ;[item] = await fetchNotionDataByIdAsync<ClassroomSchemaType>({
      notion,
      query: classroomQuery,
      processData: processClassroomDataAsync,
      updatePages: updateRefreshTime,
      filters: classroomFilters,
      id,
    })
    if (item) await redis.set(key, item)
  }

  return item
}

export async function getClassroomsAsync(notion: Client | null, currentPage: number, pageSize: number, refresh: boolean): Promise<ClassroomSchemaType[]> {
  let items: ClassroomSchemaType[] | null = null

  if (!refresh) {
    items = await fetchFromCacheIdAsync<ClassroomSchemaType>(classroomKey, currentPage, pageSize)
  }

  if (items === null) {
    ;[items] = await fetchNotionDataAsync<ClassroomSchemaType>({
      notion,
      query: { ...classroomQuery, page_size: pageSize },
      processData: processClassroomDataAsync,
      updatePages: updateRefreshTime,
    })

    if (items.length) {
      await redis.del(classroomKey)
      items.map(async (item) => {
        await redis.rPush(classroomKey, item.ID)
        await redis.set(`${classroomKey}:${item.ID}`, item)
      })

      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }

  return items
}

export async function processClassroomDataAsync(_: Client, item: any): Promise<ClassroomSchemaType | null> {
  if (!item || !isFullPage(item)) return null

  const parseItem: ClassroomSchemaType = ClassroomSchema.parse(item.properties)
  parseItem.PAGE_ID = item.id!.replaceAll('-', '')

  return parseItem
}
