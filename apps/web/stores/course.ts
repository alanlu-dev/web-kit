import type { CourseSchemaType } from '~/schema/course'

interface QueryType {
  page: number
  page_size: number
}

export const useCourseStore = defineStore('course', () => {
  const cache = ref<Map<string, CourseSchemaType[]>>(new Map())
  const length = ref<number>(0)
  const selectedIdx = ref<number>(-1)
  const selectedPage = ref<number>(1)
  const currentQuery = ref<QueryType>({ page: 1, page_size: 10 })

  const data = computed(() => {
    const cacheKey = getCacheKey(currentQuery.value)
    return cache.value.get(cacheKey) || []
  })

  const total = computed(() => Math.ceil(length.value / currentQuery.value.page_size))

  const selected = computed(() => {
    const cacheKey = getCacheKey({ page: selectedPage.value, page_size: currentQuery.value.page_size })
    const pageCourses = cache.value.get(cacheKey) || []
    return pageCourses[selectedIdx.value] || null
  })

  function getCacheKey(query: QueryType): string {
    return `${query.page}-${query.page_size}`
  }

  const fetchData = async (query: QueryType) => {
    currentQuery.value = { ...query }
    const cacheKey = getCacheKey(query)

    if (!cache.value.has(cacheKey)) {
      const { data } = await useApiFetch<CourseSchemaType[]>('/api/course', { query })
      if (data.value) {
        cache.value.set(cacheKey, data.value)
      }
    }
  }

  const fetchLength = async () => {
    const { data } = await useApiFetch<number>('/api/course/length')
    length.value = data.value || 0
  }

  return {
    cache,
    data,
    length,
    total,
    fetchData,
    fetchLength,
    selectedIdx,
    selectedPage,
    selected,
  }
})
