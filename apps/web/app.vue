<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'

useHead({
  htmlAttrs: {
    id: 'mcss',
  },
  bodyAttrs: {
    class: 'normal scrollbar',
  },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
})

const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>

<template>
  <CSSRuntimeProvider :config="import('./master.css.mjs')">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
      <ModalsContainer />
    </NuxtLayout>
  </CSSRuntimeProvider>
</template>
