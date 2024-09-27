<script setup lang="ts">
definePageMeta({
  title: '課程資訊',
  breadcrumb: {
    label: '課程資訊',
  },
})
const route = useRoute()
const page = computed(() => Number.parseInt(route.params.page as string) || 1)
</script>

<template>
  <div>
    <Hero title="課程資訊" />
    <Breadcrumb :title="`第${page}頁`" :is-page-root="true" />
    <CoursePageHero />
    <NuxtPage />
  </div>
</template>
