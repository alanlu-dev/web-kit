<script setup lang="ts">
import type { FaqSchemaType } from '~/schema/faq'

definePageMeta({
  title: '常見問答',
  breadcrumb: {
    label: '常見問答',
  },
})

useSeoMeta({
  title: '常見問答',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      // item is the url and will be resolved to the absolute url
      { name: '首頁', item: '/' },
      // item is not required for the last list element
      { name: '常見問答' },
    ],
  }),
])

// https://www.ripple-ui.com/docs/components/accordion
// Accordion on click will collapse the other open accordions
const focusable = ref(true)

const route = useRoute()
const { data: list } = await useApiFetch<FaqSchemaType[]>('/api/faq', { query: route.query })
</script>

<template>
  <div>
    <Hero title="常見問答" />
    <Breadcrumb />

    <div class="p:5x|6x px:10x@desktop py:10x@tablet">
      <section class="{flex;flex:col;gap:5x} {max-w:screen-main;mx:auto} {gap:10x}@tablet px:20x@desktop" data-aos="fade-up">
        <FaqCard v-for="(item, idx) in list" :key="item.排序!" :checked="idx === 0" :faq="item" :focusable="focusable"> </FaqCard>
      </section>

      <div class="pb:10x pb:15x@tablet"></div>
    </div>
  </div>
</template>
