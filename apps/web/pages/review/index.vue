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

// const page_size = ref(1)
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

    <div class="px:6x px:10x@desktop">
      <section class="rel {max-w:screen-max;mx:auto} overflow:hidden r:5x" data-aos="fade-up">
        <div class="{content:'';abs;inset:0;bg:home/.8}::before bg:cover bg:url(/review/cover.jpg)|no-repeat|center|36% blur(1x) h:40x h:50x@tablet h:60x@desktop"> </div>
        <div class="{abs;center;middle} {flex;center-content} p:5x|7x">
          <div class="f:5x f:6.5x@tablet f:8x@desktop font:medium ls:0.1em">
            <h1>模擬真實案場,手把手教學,學習效率更高!</h1>
            <h1>超過 <span class="fg:accent">500+</span> 則真實評價,上過課的學員們這麼說:</h1>
          </div>
        </div>
      </section>
    </div>

    <div class="px:6x px:10x@desktop">
      <section class="{grid-cols:1;gap:6x} {max-w:screen-main;mx:auto} {grid-cols:2;gap:5x}@tablet {grid-cols:3;gap:5x|8x}@desktop mt:5x mt:10x@tablet" data-aos="fade-up" data-aos-delay="200">
        <ReviewCard v-for="review in reviews" :key="review.ID" :review="review" />
      </section>

      <Pagination class="my:10x" :page="page" :total="total" :range="1" />
    </div>
  </div>
</template>
