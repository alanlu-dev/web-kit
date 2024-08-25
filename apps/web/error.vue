<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

useServerSeoMeta({
  title: '伺服器錯誤',
  description: '很抱歉，伺服器發生了未預期的錯誤',
})

const handleError = () => clearError({ redirect: '/' })

const siteConfig = useSiteConfig()
useHead({
  htmlAttrs: {
    id: 'mcss',
    lang: siteConfig.defaultLocale,
  },
  bodyAttrs: {
    class: 'normal scrollbar bg:home {top:59}_.Toastify__toast-container {top:68}_.Toastify__toast-container@tablet {top:74}_.Toastify__toast-container@lg',
  },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  templateParams: {
    schemaOrg: {
      host: siteConfig.url,
      inLanguage: siteConfig.defaultLocale, // locale.value, refs are supported
    },
  },
})
const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>

<template>
  <CSSRuntimeProvider :config="import('./master.css.mjs')">
    <LayoutDefault>
      <div class="flex full p:10x|6x px:10x@desktop">
        <div class="{max-w:screen-sm;mx:auto} bg:white my:10x@tablet p:10x p:15x|20x@tablet r:5x text:center">
          <Icon name="Warning" class="mx:auto size:94|109" />
          <h2 class="title f:48 f:medium fg:font-title mt:6x">{{ error!.statusCode }}</h2>
          <div class="h3 {flex;jc:center;flex:wrap;t:center}@2xs mt:1x">
            <span>很抱歉，伺服器發生了未預期的錯誤</span>
            <DevOnly>
              <p class="mt:4x">{{ error!.message }}</p>
              <div v-html="error!.stack"></div>
            </DevOnly>
          </div>

          <Button intent="primary" class="mt:6x" @click="handleError">回首頁</Button>
        </div>
      </div>
    </LayoutDefault>
  </CSSRuntimeProvider>
</template>
