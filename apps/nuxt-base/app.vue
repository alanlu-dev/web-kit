<script lang="ts" setup>
useHead({
  htmlAttrs: {
    id: 'mcss',
  },
  bodyAttrs: {
    class: 'normal fg:base-fg bg:base-bg overflow-x:hidden',
  },
})

const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>

<template>
  <CSSRuntimeProvider :config="import('./master.css.mjs')">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </CSSRuntimeProvider>
</template>
