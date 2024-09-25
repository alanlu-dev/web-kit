<script setup lang="ts">
const route = useRoute()
const router = useRouter()
// const common = useCommonStore()
const reviewStore = useReviewStore()
const { reviews, total } = storeToRefs(reviewStore)

// const activeBreakpoint = common.breakpoints.active()
// const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 1 : activeBreakpoint.value === 'tablet' ? 2 : 3))
const page_size = computed(() => 3)

const page = computed({
  get: () => Number.parseInt(route.params.page as string) || 1,
  set: (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  },
})

async function fetchData() {
  const params = {
    page: page.value,
    page_size: page_size.value,
    // 其他可能的查詢參數
  }
  await reviewStore.fetchReviews(params)
  await reviewStore.fetchLength()
}

watch([page, page_size], fetchData, { immediate: true })
</script>

<template>
  <div class="px:6x px:10x@desktop">
    <section class="{grid-cols:1;gap:6x} {max-w:screen-main;mx:auto} {grid-cols:2;gap:5x}@tablet {grid-cols:3;gap:5x|8x}@desktop mt:5x mt:10x@tablet" data-aos="fade-up" data-aos-delay="200">
      <ReviewCard v-for="(review, idx) in reviews" :key="review.ID" :review="review" :page="page" :idx="idx" />
    </section>

    <Pagination class="my:10x" :page="page" :total="total" :range="1" />
  </div>
</template>
