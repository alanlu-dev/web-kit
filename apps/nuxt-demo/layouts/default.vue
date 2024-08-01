<script setup lang="ts">
const localePath = useLocalePath()

const route = useRoute()
const router = useRouter()
</script>

<template>
  <div>
    <DevOnly>
      <div class="dev fixed rounded ~all|200ms bg:G-20/.5 my:4x p:4x|6x pointer-events:none right:50 top:100 z:devPanel">
        <h6 class="fg:error text:center">[DEV] 開發測試</h6>
        <p>當前路徑: {{ route.path }}</p>
        <p>當前名稱: {{ route.name }}</p>
        <p>當前參數: {{ route.params }}</p>
      </div>
    </DevOnly>

    <!-- 表頭 -->
    <header class="fixed ~all|200ms bg:base-bg h:50 h:68@md shadow:sm top:0 w:full z:header">
      <div class="abs flex pointer {fg:theme-fg;bg:theme}:hover@hover ~all|200ms ai:center h:full mx:4x>*" @click.prevent="router.back()">
        <!-- 返回 -->
        <iconify-icon icon="mdi:abjad-hebrew" />
      </div>
      <slot name="header" />
      <div class="abs center-content flex {flex;center-content;px:4x;h:full;~all|200ms}>a {fg:theme-fg;bg:theme}>a:hover@hover h:full right:0">
        <NuxtLink :to="localePath('/')">首頁</NuxtLink>
        <NuxtLink :to="localePath('/formkit')">formkit</NuxtLink>
        <NuxtLink :to="localePath('/splide')">splide</NuxtLink>
      </div>
    </header>

    <!-- 內容 -->
    <main class="center-content flex mb:8x mt:100 mt:68@md">
      <div class="rel m:auto max-w:screen-lg mt:4x px:4x">
        <slot />
      </div>
    </main>
  </div>
</template>
