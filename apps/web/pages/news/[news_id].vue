<script setup lang="ts">
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'
import type { NewsSchemaType } from '~/schema/news'

const route = useRoute()
const news_id = route.params.news_id

const { data: news } = await useFetch<{ page: NewsSchemaType; contents: NotionBlockType[] }>(`/api/news/${news_id}`, { query: route.query })
const { data: newsList } = await useFetch<NewsSchemaType[]>('/api/news', { query: { ...route.query, page: 1, page_size: 2 } })

useSeoMeta({
  title: () => news.value?.page?.標題 || '最新消息',
})
</script>

<template>
  <section class="flex flex:column">
    <div class="p:5x p:10x@tablet">
      <Breadcrumb :title="news?.page?.標題" />
      <div class="max-w:screen-md mx:auto">
        <p class="b1-r fg:font-title">{{ news?.page?.發布日期 }}</p>
        <h1 class="h1 title fg:font-content">{{ news?.page?.標題 }}</h1>
        <NotionRender class="mt:10x" :blocks="news?.contents" />
      </div>
    </div>
    <div class="bg:#F2F9FA mt:10x p:10x|6x">
      <h3 class="h3 title fg:font-title">更多消息</h3>
      <div class="b1-r center-content flex flex:column flex:row@desktop gap:10x mt:5x mx:auto">
        <NuxtLink v-for="item in newsList" :key="item.ID" class="bg:base-bg flex:1 max-w:screen-2xs p:5x|10x r:2x" :to="`/news/${item.ID}`">
          <p>{{ item.發布日期 }}</p>
          <p class="mt:3x">{{ item.標題 }}</p>
        </NuxtLink>
      </div>
      <div class="mt:10x text:center">
        <nuxt-link to="/news">
          <Iconfiy icon="material-symbols-light:arrow-right-alt">返回列表</Iconfiy>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
