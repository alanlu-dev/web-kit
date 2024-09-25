import { kv } from '@vercel/kv'
import { createClient } from 'redis'

const config = useRuntimeConfig()

function log(message?: any, ...optionalParams: any[]) {
  if (!config.public.isDev) return
  console.log(`${message}`, ...optionalParams)
}

const client = createClient({
  password: config.redis.password,
  socket: {
    host: config.redis.host,
    port: +config.redis.port,
  },
})

client.on('error', (err) => {
  console.error('Redis Client Error', err)
})

let currentStorageType = config.storageType || 'kv'
log('currentStorageType', currentStorageType, config.redis.host)

async function ensureRedisConnection() {
  if (!client.isOpen) {
    await client.connect()
  }
}

async function switchToRedis() {
  currentStorageType = 'redis'
  console.warn('Switched to Redis due to kv connection limit.')
  await ensureRedisConnection() // 確保在切換到 Redis 之後連接成功
  await clearAllData() // 切換後清除所有資料
}

async function switchToKV() {
  currentStorageType = 'kv'
  console.warn('Switched to KV due to Redis connection issue.')
  await clearAllData() // 切換後清除所有資料
}

async function clearAllData() {
  if (currentStorageType === 'redis') {
    await client.flushAll() // 清除 Redis 中的所有資料
  }
  else if (currentStorageType === 'kv') {
    await kv.flushall() // 清除 KV 中的所有資料
  }
}

async function handleError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    if (currentStorageType === 'redis') {
      await ensureRedisConnection()
    }
    else if (currentStorageType === 'kv') {
      // await ensureKVConnection()
    }
    return await operation()
  }
  catch (error) {
    if (currentStorageType === 'kv') {
      await switchToRedis()
      return await operation() // 再次嘗試操作
    }
    else if (currentStorageType === 'redis') {
      await switchToKV()
      return await operation() // 再次嘗試操作
    }
    throw error
  }
}

function processKey(key: string): string {
  if (config.public.isDev) {
    return `dev:${key}`
  }
  return `prod:${key}`
}

function processKeys(keys: string[]): string[] {
  return keys.map(processKey)
}

async function set(key: string, data: any) {
  key = processKey(key)
  log(`Setting data to key: ${key}, data: ${data}`)
  return handleError(async () => {
    if (currentStorageType === 'redis') {
      return await client.set(key, JSON.stringify(data))
    }
    else {
      return await kv.set(key, data)
    }
  })
}

async function get<T>(key: string): Promise<T | null> {
  key = processKey(key)
  // log(`Getting data from key: ${key}`)
  return handleError(async () => {
    let data: T | null = null
    if (currentStorageType === 'redis') {
      const result = await client.get(key)
      data = result ? JSON.parse(result) : null
    }
    else {
      data = await kv.get<T>(key)
    }

    if (data) log('cache hit', key)
    return data
  })
}

async function mGet<T>(keys: string[]): Promise<T[]> {
  keys = processKeys(keys)
  // log(`Getting data from keys: ${keys}`)
  return handleError(async () => {
    if (currentStorageType === 'redis') {
      const result = await client.mGet(keys)
      return (result ?? []).map((item) => (item ? JSON.parse(item) : null)) as T[]
    }
    else {
      return await kv.mget<T[]>(keys)
    }
  })
}

async function del(key: string) {
  key = processKey(key)
  log(`Deleting data from key: ${key}`)
  return handleError(async () => {
    if (currentStorageType === 'redis') {
      await client.del(key)
    }
    else {
      await kv.del(key)
    }
  })
}

async function lRange<T>(key: string, currentPage: number, pageSize: number): Promise<T[]> {
  key = processKey(key)
  // log(`Getting data from list key: ${key}, currentPage: ${currentPage}, pageSize: ${pageSize}`)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize - 1
  return handleError(async () => {
    if (currentStorageType === 'redis') {
      const result = await client.lRange(key, startIndex, endIndex)
      return result.map((item) => JSON.parse(item)) as T[]
    }
    else {
      return await kv.lrange<T>(key, startIndex, endIndex)
    }
  })
}

async function rPush(key: string, ...data: any[]): Promise<number> {
  key = processKey(key)
  log(`Pushing data to list key: ${key}, data: ${data}`)
  return handleError(async () => {
    if (currentStorageType === 'redis') {
      await ensureRedisConnection()
      const result = await client.rPush(
        key,
        data.map((item) => JSON.stringify(item)),
      ) // 展開數組參數
      log('Using Redis to push data to list', result)
      return result
    }
    else {
      log('Using kv to push data to list')
      return await kv.rpush(key, data)
    }
  })
}

async function lLen(key: string): Promise<number> {
  key = processKey(key)
  // log(`Getting list length from key: ${key}`)
  return handleError(async () => {
    if (currentStorageType === 'redis') {
      return await client.lLen(key)
    }
    else {
      return await kv.llen(key)
    }
  })
}

export const redis = {
  set,
  get,
  mGet,
  del,
  lRange,
  rPush,
  lLen,
}
