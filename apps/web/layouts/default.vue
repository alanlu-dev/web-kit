<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const showDevPanel = useState('showDevPanel', () => false)

const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'G' && event.shiftKey) {
    showDevPanel.value = !showDevPanel.value
  }
})
</script>

<template>
  <div
    class="flex flex:column max-w:screen-max min-h:100vh mx:auto"
    :class="{
      dev: showDevPanel,
      mobile: activeBreakpoint === 'mobile',
      tablet: activeBreakpoint === 'tablet',
      desktop: activeBreakpoint === 'desktop',
    }"
  >
    <LayoutGrids />
    <Header />
    <main class="flex:1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
