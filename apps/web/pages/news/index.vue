<script setup lang="ts">
import type { NewsSchemaType } from '~/schema/news'

definePageMeta({
  title: '產業消息',
  breadcrumb: {
    label: '產業消息',
  },
})

const route = useRoute()
const router = useRouter()

// const common = useCommonStore()
// const activeBreakpoint = common.breakpoints.active()

const page_size = ref(5)
// const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 10 : activeBreakpoint.value === 'tablet' ? 20 : 30))

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

const { data: news } = await useApiFetch<NewsSchemaType[]>('/api/news', { query })
const { data: length } = await useApiFetch<number>('/api/news/length', { query })

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
    <Hero title="產業消息" />
    <Breadcrumb />

    <section class="rel p:5x p:10x@tablet" data-aos="fade-up">
      <div class="{abs;center;middle} {content:'';abs;inset:0;bg:#363636CC}:before bg:cover bg:url(/news/cover.jpg)|no-repeat|center|center"> </div>
      <div class="rel {max-w:screen-main;mx:auto} fg:white">
        <h1 class="{flex;flex:col;flex:wrap} {flex:row}@desktop f:6x f:10x@tablet font:medium ls:0.15em">
          <span>清潔人員市場需求夯!</span>
          <span>9 成企業徵才指定須要清潔認證</span>
        </h1>
        <div class="{flex;flex:col;gap:5x;mt:5x} {gap:8x;mt:10x}@desktop">
          <div>
            <h3 class="h3 fg:secondary">為何清潔人力在市面上如此搶手?</h3>
            <p class="b1-m mt:2x mt:3x@tablet">
              隨著雙薪家庭越來越多,不少人忙於工作,沒空打掃家裡,使得居家清潔需求也日益增加。成為不少單親媽媽、中年失業者的轉職與二度就業新選擇。全台居家清潔消費市場高達數百億,都會城市每年還成長
              30%。然而,你知道嗎?清潔工作看似簡單,其實需要一定的專業知識和技能。
            </p>
          </div>
          <div>
            <h3 class="h3 fg:secondary">清潔工作也能晉升高薪?秘訣就在這張證照!</h3>
            <p class="b1-m mt:2x mt:3x@tablet">
              現代社會注重分工,清潔工作也逐漸走向專業化。台灣目前約有 500,000 名清潔人員缺口,有近 9
              成的企業開始要求清潔人員具備證照,以確保服務品質。根據統計,擁有清潔證照的清潔人員,平均薪資比沒有證照的高出
              20%。如果你也想成為一名專業的清潔人員,歡迎參加中華民國職業清潔認證協會的培訓課程。只要取得證照,就能在職場上更有競爭力,挑戰更高的薪資和更好的工作保障。
            </p>
          </div>
        </div>
        <div class="mt:10x mt:15x@tablet text:center">
          <Button @click="navigateTo('/course')">立即報名清潔證照課程,搶先掌握高薪職涯!</Button>
        </div>
      </div>
    </section>

    <div class="bg:home p:10x|6x px:10x@desktop">
      <section class="{flex;flex:col;gap:5x} {max-w:screen-main;mx:auto} px:5x@desktop" data-aos="fade-up">
        <NewsCard v-for="i in news" :key="i.ID" :news="i" />
      </section>

      <Pagination class="mt:10x" :page="page" :total="total" :range="1" />
    </div>
  </div>
</template>
