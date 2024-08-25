<script lang="ts" setup>
const siteConfig = useSiteConfig()

// const config = useConfigStore()
// await callOnce(async () => {
//   await config.fetchWebConfig()
// })

useHead({
  htmlAttrs: {
    id: 'mcss',
    lang: siteConfig.defaultLocale,
  },
  bodyAttrs: {
    class: 'normal scrollbar {top:59}_.Toastify__toast-container {top:68}_.Toastify__toast-container@tablet {top:74}_.Toastify__toast-container@lg',
  },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  templateParams: {
    schemaOrg: {
      host: siteConfig.url,
      inLanguage: siteConfig.defaultLocale, // locale.value, refs are supported
    },
  },
})

useSeoMeta({
  ogImage: '/meta2.png',
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
