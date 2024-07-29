<script setup lang="ts">
import type { NewsSchemaType } from '~/schema/news'

const route = useRoute()
const { data: news } = await useFetch<NewsSchemaType[]>('/api/news', { query: { ...route.query, page_size: 3 } })
</script>

<template>
  <section class="rel bg:#F2F9FA">
    <div class="max-w:screen-max mx:auto px:6x px:10x@desktop py:10x text:center">
      <h1 class="h1 title fg:font-title">產業消息</h1>

      <div class="flex flex:column gap:5x max-w:1080 mt:5x mx:auto px:5x@desktop">
        <NewsCard v-for="i in news" :key="i.ID" :news="i" />
      </div>

      <nuxt-link to="/news" class="block mt:5x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多產業消息</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
