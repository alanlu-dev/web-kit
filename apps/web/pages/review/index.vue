<script setup lang="ts">
import type { ReviewSchemaType } from '~/schema/review'

definePageMeta({
  title: '學員評價',
  breadcrumb: {
    label: '學員評價',
  },
})

useSeoMeta({
  title: '學員評價',
})

const route = useRoute()
const router = useRouter()

const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()

const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 10 : activeBreakpoint.value === 'tablet' ? 20 : 30))

interface QueryType {
  page?: number
  page_size: number
}
const query = ref<QueryType>({ ...route.query, page_size: page_size.value })
watch(
  () => route.query,
  (val) => {
    query.value = { ...val, page_size: page_size.value }
  },
)

const { data: reviews } = await useFetch<ReviewSchemaType[]>('/api/review', { query })
const { data: length } = await useFetch<number>('/api/review/length', { query })

const total = computed(() => (length.value ? Math.ceil(length.value / page_size.value) : 1))
const page = computed(() => {
  const currentPage = Number(route.query.page || 1)
  return currentPage > total.value ? total.value : currentPage
})

watch(
  () => page.value,
  (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  },
)
</script>

<template>
  <div>
    <Hero title="學員評價" />
    <Breadcrumb />

    <section class="max-w:screen-max mx:auto px:6x px:10x@tablet">
      <div class="rel overflow:hidden r:5x">
        <div class="{content:'';abs;inset:0;bg:home/.8}:before background-size:100% background:url(/review/cover.jpg)no-repeat|center|36% blur(3px) h:160 h:244@tablet"> </div>
        <div class="abs center center-content flex middle p:5x|7x">
          <div class="f:5x f:7x@tablet f:8x@desktop font:medium ls:0.1em">
            <h1>模擬真實案場,手把手教學,學習效率更高!</h1>
            <h1>超過 <span class="fg:accent">500+</span> 則真實評價,上過課的學員們這麼說:</h1>
          </div>
        </div>
      </div>

      <div class="gap:5x grid-cols:1 grid-cols:2@tablet grid-cols:3@desktop max-w:1080 mt:10x mx:auto">
        <ReviewCard v-for="review in reviews" :key="review.ID" :review="review" />
      </div>

      <Pagination :page="page" :total="total" :range="1" />
    </section>
  </div>
</template>
