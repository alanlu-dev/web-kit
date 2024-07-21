<script setup lang="ts">
import HomeCase from '~/components/Home/HomeCase.vue'

definePageMeta({
  title: '首頁',
  breadcrumb: {
    label: '首頁',
  },
})

useSeoMeta({
  title: '首頁',
})
</script>

<template>
  <div>
    <!-- 輪播 -->
    <HomeBanner />

    <!-- 協會介紹 -->
    <HomeIntroduce />

    <!-- 課程價值 -->
    <HomeValue />

    <!-- 最新消息 -->
    <HomeNews />

    <!-- 課程資訊 -->
    <!-- <HomeCourses /> -->

    <!-- 實績案例 -->
    <!-- <HomeCase /> -->

    <!-- 聯絡我們 -->
    <HomeContact />
  </div>
</template>
