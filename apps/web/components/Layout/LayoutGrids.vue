<script setup lang="ts">
const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()
</script>

<template>
  <ClientOnly>
    <!-- Grids -->
    <div class="full hidden .dev_{block} {fixed;center;middle} b:1|dotted|primary/.5 max-w:screen-max pointer-events:none px:6x px:10x@desktop z:devPanel">
      <div class="flex full b:1|dotted|black/.25">
        <div v-for="i in 12" :key="i" class="bg:primary/.1:odd flex:1"></div>
      </div>
    </div>

    <!-- Breakpoints -->
    <div class="hidden .dev_{block} {fixed;bottom:1x;right:1x} max-w:screen-max pointer-events:none z:devPanel">
      <div class="b1-b rounded bg:primary/.5 fg:white m:1x p:1x|2x">
        {{ activeBreakpoint }}
      </div>
    </div>
  </ClientOnly>
</template>
