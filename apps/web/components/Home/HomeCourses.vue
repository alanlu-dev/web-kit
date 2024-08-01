<script setup lang="ts">
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event', { query: { ...route.query, page_size: 6 } })
</script>

<template>
  <section class="max-w:screen-max mx:auto px:6x px:10x@desktop py:10x text:center">
    <h1 class="h1 title fg:font-title">課程資訊</h1>

    <div class="{grid-cols:1;gap:5x} {grid-cols:2;gap:10x|5x}@tablet {grid-cols:3;gap:10x|15x}@desktop max-w:screen-main mt:7x mt:10x@tablet mx:auto">
      <CourseCard v-for="event in courseEvents" :key="event.ID" :event="event" />
    </div>

    <nuxt-link to="/course_event" class="block mt:10x text:center">
      <Iconify icon="material-symbols-light:arrow-right-alt">更多課程</Iconify>
    </nuxt-link>
  </section>
</template>
