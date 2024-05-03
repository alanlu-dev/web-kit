<script setup lang="ts">
const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()
</script>

<template>
  <ClientOnly>
    <!-- Grids -->
    <div class="fixed hidden .dev_{flex} b:1|dotted|primary/.25 h:100vh max-w:screen-max mx:auto pointer-events:none top:0 w:full z:devPanel">
      <div v-for="i in 12" :key="i" class="flex ai:flex-end bg:primary/.2:odd flex:1 jc:center"></div>
    </div>

    <!-- Breakpoints -->
    <div class="fixed hidden .dev_{flex} bottom:0 max-w:screen-max mx:auto pointer-events:none right:0 z:devPanel">
      <div class="b1-b rounded bg:primary/.5 fg:white m:1x p:1x">
        {{ activeBreakpoint }}
      </div>
    </div>
  </ClientOnly>
</template>
