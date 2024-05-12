<script setup lang="ts">
const route = useRoute()
const case_id = route.params.case_id
</script>

<template>
  <section class="flex flex:column p:5x p:10x@tablet">
    <h1 class="h1 title">實績案例 - {{ case_id }} 🚧</h1>
  </section>
</template>
