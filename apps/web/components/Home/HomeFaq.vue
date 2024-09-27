<script setup lang="ts">
import type { FaqSchemaType } from '~/schema/faq'

const focusable = ref(true)

const route = useRoute()
const { data: list } = await useApiFetch<FaqSchemaType[]>('/api/faq', {
  query: {
    ...route.query,
    page_size: 3,
  },
})
</script>

<template>
  <section class="bg:home">
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} p:10x|6x px:10x@desktop text:center">
      <h1 class="h1 title fg:font-title">常見問答</h1>

      <div v-if="list?.length" class="{flex;flex:col;gap:5x} {max-w:screen-main;mx:auto} {gap:10x}@tablet mt:5x px:20x@desktop">
        <FaqCard v-for="item in list.slice(0, 3)" :key="item.排序!" class="bg:white!" :faq="item" :focusable="focusable"></FaqCard>
      </div>

      <nuxt-link to="/faq" class="inline-block mt:5x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多問答</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
