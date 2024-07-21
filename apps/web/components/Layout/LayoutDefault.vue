<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const showDevPanel = useState('showDevPanel', () => false)

const common = useCommonStore()

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'G' && event.shiftKey) {
    showDevPanel.value = !showDevPanel.value
  }
})
</script>

<template>
  <div class="flex rel flex:column min-h:100vh mx:auto" :class="{ dev: showDevPanel }">
    <Header />

    <main class="flex:1">
      <LayoutGrids />
      <slot />
    </main>

    <Footer />

    <ClientOnly>
      <Button
        intent="secondary"
        class="center-content fixed flex invisible rounded! {opacity:1;visible}[show=true] ~300ms|ease ~property:opacity,visibility bottom:30 bottom:60@2xs opacity:0 p:0! right:30 size:9x size:11.5x@2xs z:nav"
        :show="common.scrollY > 200"
        @click="common.scrollY = 0"
      >
        <Iconfiy icon="material-symbols-light:keyboard-arrow-up-rounded" />
      </Button>
    </ClientOnly>
  </div>
</template>
