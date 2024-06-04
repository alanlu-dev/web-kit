<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { NewsSchemaType } from '~/schema/news'

definePageMeta({
  title: '最新消息',
  breadcrumb: {
    label: '最新消息',
  },
})

useSeoMeta({
  title: '最新消息',
})

const route = useRoute()

const query = ref(route.query)
watch(
  () => route.query,
  (val) => {
    query.value = val
  },
)

// TODO: 過濾之後的分頁

const { data: news } = await useFetch<NewsSchemaType[]>('/api/news', { query })
const { data: length } = await useFetch<number>('/api/news/length', { query })

const page = computed(() => Number(route.query.page || 1))
const total = computed(() => (length.value ? Math.ceil(length.value / 10) : 1))

const newsFiltersForm = useState('newsFiltersForm', () => ({
  keywords: '',
}))

const newsFilters = useState('newsFilters', () => ({
  keywords: '',
}))

async function submitHandler() {
  // Let's pretend this is an ajax request:
  // await new Promise((r) => setTimeout(r, 1000))
  newsFilters.value.keywords = newsFiltersForm.value.keywords
}

const filterNews = computed(() => {
  if (newsFilters.value.keywords === '') return news.value
  return news.value?.filter((item) => item.標題?.includes(newsFilters.value.keywords)) || []
})
</script>

<template>
  <div>
    <Hero title="最新消息" />
    <section class="px:6x px:10vw@tablet px:22.5x@desktop">
      <Breadcrumb />

      <FormKit v-model="newsFiltersForm" type="form" :actions="false" @submit="submitHandler">
        <div class="center-content flex gap:5x">
          <FormKit name="keywords" :classes="{ wrapper: 'w:full w:240@tablet w:345@desktop' }" type="text" label="搜尋關鍵字" />
          <FormKit :classes="{ wrapper: 'text:right nowrap', input: 'p:3x|6x! mr:0!' }" type="submit" label="查詢" />
        </div>
      </FormKit>
      <div class="flex flex:column gap:12x mt:10x">
        <nuxt-link v-for="item in filterNews" :key="item.ID" :to="`/news/${item.ID}`" class="flex ai:flex-start flex:column flex:row@tablet gap:5x jc:flex-start">
          <div class="rel bg:#F2F9FA fg:font-title size:102|84 size:130|120@tablet">
            <span class="h3 abs {left:6x;top:6x}@tablet left:3x top:3x">{{ useDateFormat(item.發布日期, 'MM').value }}</span>
            <hr class="abs center middle bg:font-title h:1 rotate(118.93deg) w:70%" />
            <span class="h3 abs {bottom:6x;right:6x}@tablet bottom:3x right:3x">{{ useDateFormat(item.發布日期, 'DD').value }}</span>
          </div>
          <div class=":hover>{fg:primary}_h3 flex:5 pr:5x py:2x">
            <h3 class="h3 ~color|300ms|ease">{{ item.標題 }}</h3>
            <p class="b1-r lines:5 lines:3@tablet lines:2@desktop mt:3x"
              >🚧
              部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容部分內容
            </p>
          </div>
        </nuxt-link>
      </div>
      <Pagination :page="page" :total="total" :range="1" />
    </section>
  </div>
</template>
