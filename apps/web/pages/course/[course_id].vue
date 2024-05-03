<script setup lang="ts">
const route = useRoute()
const course_id = route.params.course_id
</script>

<template>
  <section class="flex flex:column p:5x p:10x@tablet">
    <h1 class="h1 title">課程資訊 - {{ course_id }} 🚧</h1>
  </section>
</template>
