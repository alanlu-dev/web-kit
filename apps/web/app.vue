<script lang="ts" setup>
useHead({
  htmlAttrs: {
    id: 'mcss',
  },
  bodyAttrs: {
    class: 'normal',
  },
})

const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>

<template>
  <CSSRuntimeProvider :config="import('./master.css.mjs')">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </CSSRuntimeProvider>
</template>
