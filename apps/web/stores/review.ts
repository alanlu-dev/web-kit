import { useVfm } from 'vue-final-modal'
import type { ReviewSchemaType } from '~/schema/review'

interface QueryType {
  page: number
  page_size: number
}

export const useReviewStore = defineStore('review', () => {
  const vfm = useVfm()

  const cache = ref<Map<string, ReviewSchemaType[]>>(new Map())
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
    const pageReviews = cache.value.get(cacheKey) || []
    return pageReviews[selectedIdx.value] || null
  })

  function getCacheKey(query: QueryType): string {
    return `${query.page}-${query.page_size}`
  }

  const fetchData = async (query: QueryType) => {
    currentQuery.value = { ...query }
    const cacheKey = getCacheKey(query)

    if (!cache.value.has(cacheKey)) {
      const { data } = await useApiFetch<ReviewSchemaType[]>('/api/review', { query })
      if (data.value) {
        cache.value.set(cacheKey, data.value)
      }
    }
  }

  const fetchLength = async () => {
    const { data } = await useApiFetch<number>('/api/review/length')
    length.value = data.value || 0
  }

  const select = (page: number, idx: number) => {
    selectedPage.value = page
    selectedIdx.value = idx
    vfm.open('review')
  }

  const route = useRoute()
  const routeName = computed(() => {
    const name = route.name as string
    if (name.includes('-page-page')) return name
    return `${name}-page-page`
  })
  const isHomePage = computed(() => route.name === 'index')

  const getAdjacentData = async (direction: 'prev' | 'next') => {
    if (isHomePage.value) {
      // 首頁輪播邏輯
      const totalReviews = data.value.length
      let newIdx = selectedIdx.value

      if (direction === 'next') {
        newIdx = (newIdx + 1) % totalReviews
      }
      else {
        newIdx = (newIdx - 1 + totalReviews) % totalReviews
      }

      selectedIdx.value = newIdx
      return data.value[newIdx]
    }

    // 原有的分頁邏輯
    let newPage = selectedPage.value
    let newIdx = selectedIdx.value

    if (direction === 'next') {
      if (newIdx < data.value.length - 1) {
        newIdx++
      }
      else if (newPage < total.value) {
        newPage++
        newIdx = 0
        await fetchData({ page: newPage, page_size: currentQuery.value.page_size })
        navigateTo({ name: routeName.value, params: { page: newPage } })
      }
      else {
        return null
      }
    }
    else {
      if (newIdx > 0) {
        newIdx--
      }
      else if (newPage > 1) {
        newPage--
        await fetchData({ page: newPage, page_size: currentQuery.value.page_size })
        navigateTo({ name: routeName.value, params: { page: newPage } })
        const prevPageReviews = cache.value.get(getCacheKey({ page: newPage, page_size: currentQuery.value.page_size })) || []
        newIdx = prevPageReviews.length - 1
      }
      else {
        return null
      }
    }

    selectedPage.value = newPage
    selectedIdx.value = newIdx
    return selected.value
  }
  const isFirst = computed(() => {
    if (isHomePage.value) {
      return false // 首頁輪播沒有第一個或最後一個
    }
    return selectedPage.value === 1 && selectedIdx.value === 0
  })

  const isLast = computed(() => {
    if (isHomePage.value) {
      return false // 首頁輪播沒有第一個或最後一個
    }
    return selectedPage.value === total.value && selectedIdx.value === data.value.length - 1
  })

  return {
    cache,
    data,
    length,
    total,
    fetchData,
    fetchLength,
    selectedIdx,
    selectedPage,
    select,
    selected,
    getAdjacentData,
    isFirst,
    isLast,
  }
})
