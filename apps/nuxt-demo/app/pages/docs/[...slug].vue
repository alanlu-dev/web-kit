<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main>
    {{ route.path }}
    <ContentDoc />
  </main>
</template>
