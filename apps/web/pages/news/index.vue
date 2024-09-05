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

// const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 10 : activeBreakpoint.value === 'tablet' ? 20 : 30))
// const page_size = ref(5)
const page_size = ref(9999)

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

// TODO: 分開釘選與其他新聞

const fixedNews = computed(() => {
  return news.value?.filter((n) => n.釘選)
})

const otherNews = computed(() => {
  return news.value?.filter((n) => !n.釘選)
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
          <div v-for="item in fixedNews" :key="item.ID">
            <h3 class="h3 fg:secondary">{{ item.標題 }}</h3>
            <p class="b1-m mt:2x mt:3x@tablet">
              {{ item.內容 }}
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
        <NewsCard v-for="i in otherNews" :key="i.ID" :news="i" />
      </section>

      <Pagination class="mt:10x" :page="page" :total="total" :range="1" />
    </div>
  </div>
</template>
