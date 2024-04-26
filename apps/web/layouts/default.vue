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

    <ClientOnly>
      <template #fallback>
        <Header />
      </template>
      <Header :class="{ 'shadow:md': common.scrollY > 200 }" />
    </ClientOnly>

    <main class="flex:1">
      <slot />
    </main>
    <Footer />

    <ClientOnly>
      <Button
        intent="secondary"
        class="center-content flex fixed rounded! bottom:240 p:0! right:30 size:11.5x z:nav opacity:0 visibility:hidden ~300ms|ease ~property:opacity,visibility {opacity:1;visibility:visible}[show=true]"
        :show="common.scrollY > 200"
        @click="common.scrollY = 0"
      >
        <Icon icon="material-symbols-light:keyboard-arrow-up-rounded" />
      </Button>
    </ClientOnly>
  </div>
</template>
