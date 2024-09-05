import { useVfm } from 'vue-final-modal'
import type { ReviewSchemaType } from '~/schema/review'

interface QueryType {
  page: number
  page_size: number
}

export const useReviewStore = defineStore('review', () => {
  const vfm = useVfm()

  const reviewsCache = ref<Map<string, ReviewSchemaType[]>>(new Map())
  const length = ref<number>(0)
  const selectedReviewIdx = ref<number>(-1)
  const selectedReviewPage = ref<number>(1)
  const currentQuery = ref<QueryType>({ page: 1, page_size: 10 })

  const reviews = computed(() => {
    const cacheKey = getCacheKey(currentQuery.value)
    return reviewsCache.value.get(cacheKey) || []
  })

  const total = computed(() => Math.ceil(length.value / currentQuery.value.page_size))

  const selectedReview = computed(() => {
    const cacheKey = getCacheKey({ page: selectedReviewPage.value, page_size: currentQuery.value.page_size })
    const pageReviews = reviewsCache.value.get(cacheKey) || []
    return pageReviews[selectedReviewIdx.value] || null
  })

  function getCacheKey(query: QueryType): string {
    return `${query.page}-${query.page_size}`
  }

  const fetchReviews = async (query: QueryType) => {
    currentQuery.value = { ...query }
    const cacheKey = getCacheKey(query)

    if (!reviewsCache.value.has(cacheKey)) {
      const { data } = await useApiFetch<ReviewSchemaType[]>('/api/review', { query })
      if (data.value) {
        reviewsCache.value.set(cacheKey, data.value)
      }
    }
  }

  const fetchLength = async () => {
    const { data } = await useApiFetch<number>('/api/review/length')
    length.value = data.value || 0
  }

  const selectReview = (page: number, idx: number) => {
    selectedReviewPage.value = page
    selectedReviewIdx.value = idx
    vfm.open('review')
  }

  const route = useRoute()
  const routeName = computed(() => {
    const name = route.name as string
    if (name.includes('-page-page')) return name
    return `${name}-page-page`
  })
  const isHomePage = computed(() => route.name === 'index')

  const getAdjacentReview = async (direction: 'prev' | 'next') => {
    if (isHomePage.value) {
      // 首頁輪播邏輯
      const totalReviews = reviews.value.length
      let newIdx = selectedReviewIdx.value

      if (direction === 'next') {
        newIdx = (newIdx + 1) % totalReviews
      }
      else {
        newIdx = (newIdx - 1 + totalReviews) % totalReviews
      }

      selectedReviewIdx.value = newIdx
      return reviews.value[newIdx]
    }

    // 原有的分頁邏輯
    let newPage = selectedReviewPage.value
    let newIdx = selectedReviewIdx.value

    if (direction === 'next') {
      if (newIdx < reviews.value.length - 1) {
        newIdx++
      }
      else if (newPage < total.value) {
        newPage++
        newIdx = 0
        await fetchReviews({ page: newPage, page_size: currentQuery.value.page_size })
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
        await fetchReviews({ page: newPage, page_size: currentQuery.value.page_size })
        navigateTo({ name: routeName.value, params: { page: newPage } })
        const prevPageReviews = reviewsCache.value.get(getCacheKey({ page: newPage, page_size: currentQuery.value.page_size })) || []
        newIdx = prevPageReviews.length - 1
      }
      else {
        return null
      }
    }

    selectedReviewPage.value = newPage
    selectedReviewIdx.value = newIdx
    return selectedReview.value
  }
  const isFirstReview = computed(() => {
    if (isHomePage.value) {
      return false // 首頁輪播沒有第一個或最後一個
    }
    return selectedReviewPage.value === 1 && selectedReviewIdx.value === 0
  })

  const isLastReview = computed(() => {
    if (isHomePage.value) {
      return false // 首頁輪播沒有第一個或最後一個
    }
    return selectedReviewPage.value === total.value && selectedReviewIdx.value === reviews.value.length - 1
  })

  return {
    reviewsCache,
    reviews,
    length,
    total,
    fetchReviews,
    fetchLength,
    selectedReviewIdx,
    selectedReviewPage,
    selectReview,
    selectedReview,
    getAdjacentReview,
    isFirstReview,
    isLastReview,
  }
})
