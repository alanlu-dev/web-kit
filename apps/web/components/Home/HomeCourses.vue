<script setup lang="ts">
import type { CourseSchemaType } from '~/schema/course'

const route = useRoute()
const { data: courses } = await useApiFetch<CourseSchemaType[]>('/api/course', { query: { ...route.query, page_size: 6 } })
</script>

<template>
  <section>
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} p:10x|6x px:10x@desktop text:center">
      <h1 class="h1 title fg:font-title">課程資訊</h1>

      <div class="{grid-cols:1;gap:5x} {max-w:screen-main;mx:auto} {grid-cols:2}@tablet {grid-cols:3;gap:10x|5x}@sm {grid-cols:3;gap:10x|15x}@desktop mt:5x mt:10x@tablet">
        <CourseCard v-for="course in courses?.splice(0, 6)" :key="course.ID" :course="course" />
      </div>

      <nuxt-link to="/course" class="inline-block mt:10x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多課程</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
