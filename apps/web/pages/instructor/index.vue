<script setup lang="ts">
import type { InstructorSchemaType } from '~/schema/instructor'

definePageMeta({
  title: '師資陣容',
  breadcrumb: {
    label: '師資陣容',
  },
})

useSeoMeta({
  title: '師資陣容',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      // item is the url and will be resolved to the absolute url
      { name: '首頁', item: '/' },
      // item is not required for the last list element
      { name: '師資陣容' },
    ],
  }),
])

const route = useRoute()
const { data: instructors } = await useFetch<InstructorSchemaType[]>('/api/instructor', { query: { ...route.query, page_size: 99 } })
</script>

<template>
  <div>
    <Hero title="師資陣容" />
    <Breadcrumb />

    <section class="mb:10x mb:20x@tablet px:6x px:10x@desktop" data-aos="fade-up">
      <div class="{max-w:screen-main;mx:auto}">
        <InstructorCard v-for="instructor in instructors" :key="instructor.ID" :instructor="instructor" />
      </div>
    </section>
  </div>
</template>
