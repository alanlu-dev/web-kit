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

async function ensureRedisConnection() {
  if (!client.isOpen) {
    await client.connect()
  }
}

async function handleError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    await ensureRedisConnection()
    return await operation()
  }
  catch (error) {
    console.log('redis error', error)
    // TODO: 切換到其他 Redis 伺服器
    return await operation() // 再次嘗試操作
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
    return await client.set(key, JSON.stringify(data))
  })
}

async function get<T>(key: string): Promise<T | null> {
  key = processKey(key)
  // log(`Getting data from key: ${key}`)
  return handleError(async () => {
    let data: T | null = null
    const result = await client.get(key)
    data = result ? JSON.parse(result) : null
    if (data) log('cache hit', key)
    return data
  })
}

async function mGet<T>(keys: string[]): Promise<T[]> {
  keys = processKeys(keys)
  // log(`Getting data from keys: ${keys}`)
  return handleError(async () => {
    const result = await client.mGet(keys)
    return (result ?? []).map((item) => (item ? JSON.parse(item) : null)) as T[]
  })
}

async function del(key: string) {
  key = processKey(key)
  log(`Deleting data from key: ${key}`)
  return handleError(async () => {
    await client.del(key)
  })
}

async function lRange<T>(key: string, currentPage: number, pageSize: number): Promise<T[]> {
  key = processKey(key)
  // log(`Getting data from list key: ${key}, currentPage: ${currentPage}, pageSize: ${pageSize}`)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize - 1
  return handleError(async () => {
    const result = await client.lRange(key, startIndex, endIndex)
    return result.map((item) => JSON.parse(item)) as T[]
  })
}

async function rPush(key: string, ...data: any[]): Promise<number> {
  key = processKey(key)
  log(`Pushing data to list key: ${key}, data: ${data}`)
  return handleError(async () => {
    const result = await client.rPush(
      key,
      data.map((item) => JSON.stringify(item)),
    ) // 展開數組參數
    log('Using Redis to push data to list', result)
    return result
  })
}

async function lLen(key: string): Promise<number> {
  key = processKey(key)
  // log(`Getting list length from key: ${key}`)
  return handleError(async () => {
    return await client.lLen(key)
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
