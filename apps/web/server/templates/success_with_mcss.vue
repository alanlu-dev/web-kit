<script setup lang="ts">
import { Container, Html, Img, Link } from '@vue-email/components'

defineProps({
  siteUrl: String,
  courseName: String,
  courseLink: String,
  studentName: String,
  orderNumber: String,
  paymentAmount: String,
  paymentType: String,
  paymentDate: String,
  courseDate: String,
  courseTime: String,
  courseDateMinus7: String,
  courseLocation: String,
  logoSrc: String,
})
</script>

<template>
  <Head>
    <meta charset="utf-8" />
  </Head>
  <section class="normal! mt:8x_section">
    <section>
      <p class=""
        >親愛的 <span class="f:bold fg:primary">{{ studentName }}</span> ，您好！</p
      >
      <p
        >感謝您報名參加中國民國職業認證協會的 【<Link :href="courseLink" class="f:bold fg:primary!">{{ courseName }}</Link
        >】。恭喜您已成功報名本課程並付款完成。
      </p>
    </section>

    <section>
      <p class="f:bold fg:primary">課程資訊</p>
      <p
        >課程名稱：<span class="f:bold fg:font-title">{{ courseName }}</span></p
      >
      <p
        >課程日期：<span class="f:bold fg:font-title">{{ courseDate }}</span></p
      >
      <p
        >課程時間：<span class="f:bold fg:font-title">{{ courseTime }}</span></p
      >
      <p
        >上課地點：<span class="f:bold fg:font-title">{{ courseLocation }}</span></p
      >
    </section>

    <section>
      <p class="f:bold fg:primary">付款資訊</p>
      <p
        >訂單編號：<span class="f:bold fg:font-title">{{ orderNumber }}</span></p
      >
      <p
        >付款金額：<span class="f:bold fg:font-title">{{ paymentAmount }}</span></p
      >
      <p
        >付款方式：<span class="f:bold fg:font-title">{{ paymentType }}</span></p
      >
      <p
        >付款日期：<span class="f:bold fg:font-title">{{ paymentDate }}</span></p
      >
    </section>

    <section>
      <p class="f:bold fg:primary">重要提醒</p>
      <p>．上課當日請攜帶身份證件以便簽到。</p>
      <p>．請提供 2 吋(3.7cm x 4.6cm)大頭照兩張以利證書製作。</p>
      <p>．本課程將提供清潔用品及工具，您無須自備。</p>
      <p>．本課程若有異動，將以電話及電子郵件方式通知。</p>
      <p
        >．若因故無法出席，請於 <span class="f:bold fg:accent">{{ courseDateMinus7 }}</span> 前告知，以便辦理退費事宜。</p
      >
      <p>．若有任何問題，歡迎來電洽詢： <Link href="tel+886-968-047-766">0968-047-766</Link>。</p>
      <p>．再次感謝您對本協會的支持，期待在課堂上與您見面，並預祝學習愉快！</p>
    </section>

    <section>
      <Link :href="siteUrl">
        <p class="f:bold fg:font-title">中國民國職業清潔認證協會 PCCA</p>
      </Link>
      <Link :href="siteUrl">
        <Img :src="logoSrc" alt="Logo" width="300" height="300" />
      </Link>
    </section>
  </section>
</template>
