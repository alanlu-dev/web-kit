export * from './callback'
export * from './error-msg'
export * from './options'

/**
 * Get the default values from the props object and merge them with the overrideProps object.
 * @param props - The props object containing the default values.
 * @param overrideProps - The object containing the override values.
 * @returns The merged object with default and override values.
 */
function getDefaultFromProps<T = Record<string, any>>(props: Record<string, any>, overrideProps: T): T | Record<string, any> {
  const defaults = Object.entries(props).reduce<Record<string, any>>((temp, [key, value]) => {
    temp[key] = value?.default
    return temp
  }, {})
  return {
    ...defaults,
    ...overrideProps,
  }
}

function obj2QueryString(params?: Record<string, any>): string {
  if (!params) return ''
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key])).replace('/%20/g', '+')}`)
    .join('&')
}

function queryString2Obj(str?: string): Record<string, any> {
  if (!str) return {}
  return str.split('&').reduce((acc: Record<string, any>, params: string) => {
    const p = params.split('=', 2)
    if (p.length > 1) acc[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
    return acc
  }, {})
}

function arrayToObject<T extends Record<K, PropertyKey>, K extends keyof any>(array: T[], keyProp: K): Record<T[K], T> {
  return array.reduce(
    (obj, item) => {
      setItem(obj, item[keyProp], item)
      return obj
    },
    {} as Record<T[K], T>,
  )
}

function setItem<T, K extends keyof T>(obj: T, key: K, item: T[K]): void {
  obj[key] = item
}

export { arrayToObject, getDefaultFromProps, obj2QueryString, queryString2Obj, setItem }
