<script lang="ts" setup>
const siteConfig = useSiteConfig()
const config = useRuntimeConfig()
const route = useRoute()
const { $refreshAos } = useNuxtApp()

useHead({
  htmlAttrs: {
    id: 'mcss',
    lang: siteConfig.defaultLocale,
  },
  bodyAttrs: {
    class: 'normal scrollbar {top:59}_.Toastify__toast-container {top:68}_.Toastify__toast-container@tablet {top:74}_.Toastify__toast-container@lg',
  },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],

  titleTemplate: '%s',
  templateParams: {
    schemaOrg: {
      host: siteConfig.url,
      inLanguage: siteConfig.defaultLocale, // locale.value, refs are supported
    },
  },
})

const fullPath = computed(() => (route.fullPath === '/' ? '/index' : route.fullPath))

const metaStore = useMetaStore()

metaStore.updateMeta(
  fullPath.value,
  null,
  config.public.isDev && import.meta.server
    ? {
        query: { ssr: true, refresh: true },
        header: { 'x-prerender-revalidate': config.vercel?.bypassToken },
      }
    : {},
)

onMounted(() => {
  watch(fullPath, async (path) => {
    $refreshAos()

    switch (route.name) {
      case 'index':
      case 'course':
      case 'instructor':
      case 'review':
      case 'faq':
      case 'news':
      case 'about': {
        metaStore.updateMeta(path)
      }
    }
  })
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
