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
</script>

<template>
  <LayoutDefault>
    <div class="{max-w:screen-4xs;mx:auto} my:40x">
      <h2 class="h2 title fg:font-title">{{ error!.statusCode }}</h2>
      <div class="f:medium mt:4x t:center">很抱歉，伺服器發生了未預期的錯誤</div>

      <DevOnly>
        <p class="mt:4x">{{ error!.message }}</p>
        <div v-html="error!.stack"></div>
      </DevOnly>

      <Button intent="primary" class="mt:8x w:full" @click="handleError">回首頁</Button>
    </div>
  </LayoutDefault>
</template>
