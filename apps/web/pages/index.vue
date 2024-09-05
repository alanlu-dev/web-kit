<script setup lang="ts">
definePageMeta({
  title: '首頁',
  breadcrumb: {
    label: '首頁',
  },
})
</script>

<template>
  <div>
    <!-- 輪播 -->
    <HomeBanner />

    <!-- 協會介紹 -->
    <HomeIntroduce />

    <!-- 課程價值 -->
    <HomeValue data-aos="fade-up" />

    <!-- 課程資訊 -->
    <HomeCourses data-aos="fade-up" />

    <!-- 師資陣容 -->
    <HomeInstructors data-aos="fade-up" />

    <!-- 學員滿意度 -->
    <HomeReviews data-aos="fade-up" />

    <!-- 常見問達 -->
    <HomeFaq data-aos="fade-up" />

    <!-- 產業消息 -->
    <HomeNews data-aos="fade-up" />
  </div>
</template>
