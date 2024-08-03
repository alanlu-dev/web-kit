import { kv } from '@vercel/kv'

export async function fetchFromCacheIdAsync<T>(key: string, currentPage: number, pageSize: number): Promise<T[] | null> {
  const ids = await kv.lrange(key, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
  if (ids.length) {
    console.log('cache hit', key)
    const keys = ids.map((id) => `${key}:${id}`)
    const data = await kv.mget<T[]>(keys)
    return data
  }
  else if (currentPage > 1) {
    return []
  }
  return null
}

export async function fetchFromCacheAsync<T>(key: string, currentPage: number, pageSize: number): Promise<T[] | null> {
  const items = await kv.lrange<T>(key, (currentPage - 1) * pageSize, currentPage * pageSize - 1)
  if (items.length) {
    console.log('cache hit', key)
    return items
  }
  else if (currentPage > 1) {
    return []
  }
  return null
}
