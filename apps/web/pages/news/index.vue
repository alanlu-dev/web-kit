<script setup lang="ts">
import type { NewsSchemaType } from '~/schema/news'

definePageMeta({
  title: '最新消息',
  breadcrumb: {
    label: '最新消息',
  },
})

const { data: news } = await useFetch<NewsSchemaType[]>('/api/news')

const newsFilters = useState('newsFilters', () => ({
  keywords: '',
}))

async function submitHandler() {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000))
  console.log(123)
}
</script>

<template>
  <div>
    <Hero title="最新消息🚧" />
    <section class="px:6x px:22.5x@tablet">
      <Breadcrumb />

      <FormKit v-model="newsFilters" type="form" :config="{ classes: { wrapper: 'max-w:unset!', outer: 'mb:0!' } }" :actions="false" @submit="submitHandler">
        <div class="center-content flex gap:5x">
          <FormKit name="keywords" :classes="{ wrapper: 'w:full w:345@tablet' }" type="text" label="搜尋關鍵字" />
          <FormKit :classes="{ wrapper: 'text:right nowrap', input: 'p:3x|6x! mr:0!' }" type="submit" label="查詢" />
        </div>
      </FormKit>
    </section>
  </div>
</template>
