<script setup lang="ts">
import type { NewsSchemaType } from '~/schema/news'

interface IProps {
  news: NewsSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="bg:white p:3x|5x p:7x|5x@tablet p:8x|9x@desktop r:2x text:left w:full">
    <h3 class="b1-r fg:primary">{{ news.標題 }}</h3>
    <p class="b2-r fg:font-title mt:2x">{{ news.內容 }}</p>
  </div>
</template>
