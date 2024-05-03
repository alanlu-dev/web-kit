<script setup lang="ts">
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'

const route = useRoute()
const news_id = route.params.news_id

const { data: news } = await useFetch<{ contents: NotionBlockType[] }>(`/api/news/${news_id}`)
</script>

<template>
  <section class="flex flex:column p:5x p:10x@tablet">
    <h1 class="h1 title">最新消息 - {{ news_id }} 🚧</h1>
    <NotionRender :blocks="news?.contents" />
  </section>
</template>
