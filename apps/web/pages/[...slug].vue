<script setup lang="ts">
useServerSeoMeta({
  title: '頁面不存在',
  description: '糟糕，我們找不到您要查找的頁面，可能網頁過期或發生了無法預期的錯誤',
})

// const dot = ref(1)
const timer = ref(5)
let interval: NodeJS.Timeout = null as any

onMounted(() => {
  interval = setInterval(() => {
    timer.value--
    if (timer.value === 0) {
      goHome()
    }

    // dot.value++
    // if (dot.value > 3) {
    //   dot.value = 0
    // }
  }, 1000)
})
onUnmounted(() => {
  clearInterval(interval)
})

function goHome() {
  navigateTo({ replace: true, name: 'index' })
}
</script>

<template>
  <div class="{max-w:screen-4xs;mx:auto} my:40x">
    <h2 class="h2 title fg:font-title">404</h2>
    <p class="mt:4x">糟糕，我們找不到您要查找的頁面，可能網頁過期或發生了無法預期的錯誤</p>

    <Button intent="primary" class="mt:8x w:full" @click="goHome">回首頁</Button>

    <ClientOnly>
      <div class="fg:divider mt:4x t:center">
        <p v-if="timer > 0">
          {{ timer }} 秒後回首頁
          <!-- <span v-for="idx in dot" :key="idx">.</span> -->
        </p>
        <p v-else>正導轉回首頁...</p>
      </div>
    </ClientOnly>
  </div>
</template>
