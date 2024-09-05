export async function fetchFromCacheIdAsync<T>(key: string, currentPage: number, pageSize: number): Promise<T[] | null> {
  const ids = await redis.lRange(key, currentPage, pageSize)
  console.log('ids', currentPage, pageSize, ids)
  if (ids.length) {
    console.log('cache hit', key)
    const keys = ids.map((id) => `${key}:${id}`)
    const data = await redis.mGet<T>(keys)
    return data
  }
  else if (currentPage > 1) {
    return []
  }
  return null
}

export async function fetchFromCacheAsync<T>(key: string, currentPage: number, pageSize: number): Promise<T[] | null> {
  const items = await redis.lRange<T>(key, currentPage, pageSize)
  console.log('items', currentPage, pageSize, items.length)
  if (items.length) {
    console.log('cache hit', key)
    return items
  }
  else if (currentPage > 1) {
    return []
  }
  return null
}
