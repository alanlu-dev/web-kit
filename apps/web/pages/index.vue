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

    <!-- 課程資訊 -->
    <HomeCourses />

    <!-- 師資陣容 -->
    <HomeInstructors />

    <!-- 學員滿意度 -->
    <!-- <HomeReviews /> -->

    <!-- 常見問達 -->
    <!-- <HomeFaq /> -->

    <!-- 產業消息 -->
    <HomeNews />
  </div>
</template>
