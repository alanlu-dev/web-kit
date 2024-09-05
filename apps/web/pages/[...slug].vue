<script setup lang="ts">
definePageMeta({
  layout: false,
})
useServerSeoMeta({
  title: '頁面不存在',
  description: '糟糕，我們找不到您要查找的頁面，可能網頁過期或發生了無法預期的錯誤',
})

// const dot = ref(1)
// const timer = ref(5)
// let interval: NodeJS.Timeout = null as any

// onMounted(() => {
//   interval = setInterval(() => {
//     timer.value--
//     if (timer.value === 0) {
//       goHome()
//     }

//     // dot.value++
//     // if (dot.value > 3) {
//     //   dot.value = 0
//     // }
//   }, 1000)
// })
// onUnmounted(() => {
//   clearInterval(interval)
// })

function goHome() {
  navigateTo({ replace: true, name: 'index' })
}
</script>

<template>
  <LayoutDefault class="bg:home">
    <div class="flex full p:10x|6x px:10x@desktop">
      <div class="{max-w:screen-sm;mx:auto} bg:white my:10x@tablet p:10x p:15x|20x@tablet r:5x text:center">
        <Icon name="Warning" class="mx:auto size:94|109" />
        <h2 class="title f:48 f:medium fg:font-title mt:6x">404</h2>
        <div class="h3 {flex;jc:center;flex:wrap;t:center}@2xs mt:1x">
          <span>糟糕，我們找不到您要查找的頁面，</span>
          <span>可能網頁過期或發生了無法預期的錯誤，</span>
          <span>若有緊急問題，請透過下方聯絡專線與我們聯繫</span>
        </div>

        <Button intent="primary" class="mt:6x" @click="goHome">回首頁</Button>

        <!-- <ClientOnly>
      <div class="fg:divider mt:4x t:center">
        <p v-if="timer > 0">
          {{ timer }} 秒後回首頁
          <span v-for="idx in dot" :key="idx">.</span>
        </p>
        <p v-else>正導轉回首頁...</p>
      </div>
    </ClientOnly> -->
      </div>
    </div>
  </LayoutDefault>
</template>
