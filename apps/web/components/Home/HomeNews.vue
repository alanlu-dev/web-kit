<script setup lang="ts">
import type { NewsSchemaType } from '~/schema/news'

const { data: news } = await useFetch<NewsSchemaType[]>('/api/news/?page_size=4')
</script>

<template>
  <section class="flex flex:column px:7x py:5x py:10x@tablet">
    <h1 class="h1 title">最新消息</h1>
    <div class="center-content inline-flex flex:column flex:row@tablet flex:wrap gap:5x gap:12x|6x@tablet gap:12x|11x@desktop mt:5x mt:8x@tablet mx:auto">
      <nuxt-link v-for="i in news" :key="i.ID" class="~color|300ms|ease bb:1|divider fg:primary-hover:hover flex:1|0|45% max-w:400@tablet max-w:500@desktop" :to="`/news/${i.ID}`">
        <p class="b1-b fg:font-title">{{ i.發布日期 }}</p>
        <h3 class="b1-b lines:1 my:2x my:3x@tablet">{{ i.標題 }}</h3>
      </nuxt-link>
    </div>

    <div class="{mt:7.5x}@tablet mb:1.5x mt:6x text:center">
      <nuxt-link to="/news">
        <Icon icon="material-symbols-light:arrow-right-alt">更多消息</Icon>
      </nuxt-link>
    </div>
  </section>
</template>
