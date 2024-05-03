<script setup lang="ts">
const route = useRoute()
const courseId = route.params.courseId
</script>

<template>
  <section class="flex flex:column p:5x p:10x@tablet">
    <h1 class="h1 title">課程資訊 - {{ courseId }} 🚧</h1>
  </section>
</template>
