<script setup lang="ts">
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'

const route = useRoute()
const newsId = route.params.newsId

const { data: news } = await useFetch<{ contents: NotionBlockType[] }>(`/api/news/${newsId}`)
</script>

<template>
  <section class="flex flex:column p:5x p:10x@tablet">
    <h1 class="h1 title">最新消息 - {{ newsId }} 🚧</h1>
    <NotionRender :blocks="news?.contents" />
  </section>
</template>
