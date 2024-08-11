<script setup lang="ts">
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event', { query: { ...route.query, page_size: 6 } })
</script>

<template>
  <section>
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} p:10x|6x px:10x@desktop text:center">
      <h1 class="h1 title fg:font-title">課程資訊</h1>

      <div class="{grid-cols:1;gap:5x} {max-w:screen-main;mx:auto} {grid-cols:2}@tablet {grid-cols:3;gap:10x|5x}@sm {grid-cols:3;gap:10x|15x}@desktop mt:5x mt:10x@tablet">
        <CourseCard v-for="event in courseEvents" :key="event.ID" :event="event" />
      </div>

      <nuxt-link to="/course_event" class="inline-block mt:10x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多課程</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
