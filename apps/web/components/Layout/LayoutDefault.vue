<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { ModalsContainer } from 'vue-final-modal'
import { useEventListener } from '@vueuse/core'
import type { MetaSchemaType } from '~/schema/meta'

const showDevPanel = useState('showDevPanel', () => false)

const common = useCommonStore()

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'G' && event.shiftKey) {
    showDevPanel.value = !showDevPanel.value
  }
})

const { $refreshAos } = useNuxtApp()

const route = useRoute()

const { data: meta } = await useApiFetch<MetaSchemaType>(`/api/meta${route.fullPath === '/' ? '/index' : route.fullPath}`)

useHead({
  titleTemplate: !meta.value || meta.value?.後墜 ? '%s %separator %siteName' : '%s',
})

useSeoMeta({
  title: () => meta.value?.標題 || (route.name as string),
  description: () => meta.value?.描述,
  ogImage: () => meta.value?.圖片 || '/meta2.png',
})

onMounted(() => {
  watch(
    () => route.fullPath,
    async () => {
      $refreshAos()

      switch (route.name) {
        case 'index':
        case 'about':
        case 'course':
        case 'faq':
        case 'instructor':
        case 'news':
        case 'review': {
          const { data: meta } = await useApiFetch<MetaSchemaType>(`/api/meta${route.fullPath === '/' ? '/index' : route.fullPath}`)

          useHead({
            titleTemplate: !meta.value || meta.value?.後墜 ? '%s %separator %siteName' : '%s',
          })

          useSeoMeta({
            title: () => meta.value?.標題 || (route.name as string),
            description: () => meta.value?.描述,
            ogImage: () => meta.value?.圖片 || '/meta2.png',
          })
        }
      }
    },
  )
})
</script>

<template>
  <div class="rel {flex;flex:col} min-h:100vh mx:auto" :class="{ dev: showDevPanel }">
    <Header />

    <SpeedInsights />
    <ModalsContainer />

    <main class="flex:1">
      <LayoutGrids />
      <slot />
    </main>

    <Footer />

    <ClientOnly>
      <Button
        intent="secondary"
        class="fixed invisible round! {bottom:3x;right:3x;f:6.75x;size:6.75x;min-w:6.75x} {flex;center-content} {bottom:4x;right:4x;f:9x;size:9x;min-w:9x}@tablet {bottom:5x;right:5x;f:10x;size:10x;min-w:10x}@desktop {opacity:1;visible}[show=true] ~300ms|ease ~property:opacity,visibility opacity:0 p:0! z:nav"
        :show="common.scrollY > 200"
        @click="common.scrollY = 0"
      >
        <Iconify class="flex! size:inherit" icon="material-symbols-light:keyboard-arrow-up-rounded" />
      </Button>
    </ClientOnly>
  </div>
</template>
