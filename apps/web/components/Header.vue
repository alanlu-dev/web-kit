<script setup lang="ts">
const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()
</script>

<template>
  <header class="center-content flex sticky bg:base-bg left:0 max-w:inherit p:4x|5x p:4x|10x@tablet shadow:md top:0 w:full z:header">
    <div class="center-content flex gap:2x gap:3x@tablet">
      <nuxt-link class="rounded ~background|300ms|ease bg:font-content bg:primary-hover:hover size:6x size:9x@tablet size:10x@desktop" to="/"></nuxt-link>
      <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:6x@tablet f:7x@desktop font:bold">中華民國職業清潔認證協會</p>
    </div>
    <nav v-if="activeBreakpoint === 'desktop'" class="ml:auto">
      <ul class="b1-r center-content flex nowrap {ls:0.05em;mr:-0.05em;text:right;~color|300ms|ease}_a fg:primary-hover_a:hover flex:wrap gap-x:9x">
        <li><nuxt-link to="/news">最新消息</nuxt-link></li>
        <li><nuxt-link to="/course">課程資訊</nuxt-link></li>
        <li><nuxt-link to="/kit">實績案例</nuxt-link></li>
        <li><nuxt-link to="/faq">常見問題</nuxt-link></li>
        <li><nuxt-link to="/about">關於我們</nuxt-link></li>
      </ul>
    </nav>
    <div v-else class="center-content flex {f:27;size:27} {f:9x;size:9x}@tablet b:1|font-content bg:base-bg cursor:pointer ml:auto r:2x">
      <Icon class="f:0.6em!_:where(iconify-icon)" icon="material-symbols-light:menu" />
    </div>
  </header>
</template>
