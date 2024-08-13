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

useSeoMeta({
  title: () => meta.value?.標題 || (route.name as string),
  description: () => meta.value?.描述,
  ogImage: () => meta.value?.圖片 || '/about/jie_housekeeper.png',
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

          useSeoMeta({
            title: () => meta.value?.標題 || (route.name as string),
            description: () => meta.value?.描述,
            ogImage: () => meta.value?.圖片 || '/about/jie_housekeeper.png',
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
        class="invisible round! {f:6.75x;size:6.75x;min-w:6.75x} {fixed;bottom:50x;right:3x} {flex;center-content} {bottom:60x;right:2x}@tablet {f:9x;size:9x;min-w:9x}@tablet {f:10x;size:10x;min-w:10x}@desktop {right:5x}@desktop {opacity:1;visible}[show=true] ~300ms|ease ~property:opacity,visibility opacity:0 p:0! z:nav"
        :show="common.scrollY > 200"
        @click="common.scrollY = 0"
      >
        <Iconify class="flex! size:inherit" icon="material-symbols-light:keyboard-arrow-up-rounded" />
      </Button>
    </ClientOnly>
  </div>
</template>
