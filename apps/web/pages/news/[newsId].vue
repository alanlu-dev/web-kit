<script setup lang="ts">
const route = useRoute()
const newsId = route.params.newsId
</script>

<template>
  <section class="flex flex:column p:5x p:10x@tablet">
    <h1 class="h1 title">最新消息 - {{ newsId }} 🚧</h1>
  </section>
</template>
