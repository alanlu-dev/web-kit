<script setup lang="ts">
import { Img, Link, Section, Text } from '@vue-email/components'

interface IProps {
  siteUrl: string
  courseName: string
  courseLink: string
  studentName: string
  orderNumber: string
  paymentAmount: string
  paymentType: string
  paymentDate: string
  courseDate: string
  courseTime: string
  courseDateMinus7: string
  courseLocation: string
  logoSrc: string
}

defineProps<IProps>()
</script>

<template>
  <Head>
    <meta charset="utf-8" />
  </Head>
  <Section>
    <Section>
      <Text
        >親愛的 <span>{{ studentName }}</span> ，您好！</Text
      >
      <Text
        >感謝您報名參加中華民國職業認證協會的【<strong>
          <Link :href="courseLink">{{ courseName }}</Link> </strong
        >】。恭喜您已成功報名本課程並付款完成。
      </Text>
    </Section>

    <Section>
      <Text><strong>課程資訊</strong></Text>
      <Text
        >課程名稱：<span>{{ courseName }}</span></Text
      >
      <Text
        >課程日期：<span>{{ courseDate }}</span></Text
      >
      <Text
        >課程時間：<span>{{ courseTime }}</span></Text
      >
      <Text
        >上課地點：<span>{{ courseLocation }}</span></Text
      >
    </Section>

    <Section>
      <Text><strong>付款資訊</strong></Text>
      <Text
        >訂單編號：<span>{{ orderNumber }}</span></Text
      >
      <Text
        >付款金額：<span>{{ paymentAmount }}</span></Text
      >
      <Text
        >付款方式：<span>{{ paymentType }}</span></Text
      >
      <Text
        >付款日期：<span>{{ paymentDate }}</span></Text
      >
    </Section>

    <Section>
      <Text><strong>重要提醒</strong></Text>
      <Text>．上課當日請攜帶身份證件以便簽到。</Text>
      <Text>．請提供 2 吋(3.7cm x 4.6cm)大頭照兩張以利證書製作。</Text>
      <Text>．本課程將提供清潔用品及工具，您無須自備。</Text>
      <Text>．本課程若有異動，將以電話及電子郵件方式通知。</Text>
      <Text style="color: red"
        >．若因故無法出席，請於 <span>{{ courseDateMinus7 }}</span> 前告知，以便辦理退費事宜。</Text
      >
      <Text>．若有任何問題，歡迎來電洽詢： <Link href="tel+886-968-047-766">0968-047-766</Link>。 </Text>
      <Text>．再次感謝您對本協會的支持，期待在課堂上與您見面，並預祝學習愉快！</Text>
    </Section>

    <Section>
      <Link :href="siteUrl">
        <Text>中華民國職業清潔認證協會 PCCA</Text>
      </Link>
      <Link :href="siteUrl">
        <Img :src="logoSrc" alt="Logo" width="300" height="300" />
      </Link>
    </Section>
  </Section>
</template>
