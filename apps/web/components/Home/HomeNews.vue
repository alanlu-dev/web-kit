<script setup lang="ts">
import type { NewsSchemaType } from '~/schema/news'

const route = useRoute()
const { data: news } = await useFetch<NewsSchemaType[]>('/api/news', { query: { ...route.query, page_size: 3 } })
</script>

<template>
  <section class="bg:home">
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} p:10x|6x px:10x@desktop text:center">
      <h1 class="h1 title fg:font-title">產業消息</h1>

      <div class="{flex;flex:col;gap:5x} {max-w:screen-main;mx:auto} mt:5x px:5x@desktop">
        <NewsCard v-for="i in news?.slice(0, 3)" :key="i.ID" :news="i" />
      </div>

      <nuxt-link to="/news" class="inline-block mt:5x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多產業消息</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
