<script setup lang="ts">
import { Img, Link, Section, Text } from '@vue-email/components'

interface IProps {
  siteUrl: string
  siteName: string
  payPlace: string
  payAddress: string
  courseName: string
  courseLink: string
  studentName: string
  orderNumber: string
  deathLine: string
  courseDate: string
  courseTime: string
  courseDateMinus7: string
  courseLocation: string
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
        >感謝您報名參加{{ siteName }}的【<strong>
          <Link :href="courseLink">{{ courseName }}</Link> </strong
        >】。您選擇的繳費方式為【現金付款】，<strong>請務必於 {{ deathLine }} 內親至本協會完成繳費，逾時將視同自動放棄報名。</strong>
      </Text>
    </Section>

    <Section>
      <Text
        >繳費地點：<span>{{ payPlace }}</span></Text
      >
      <Text
        >繳費地址：<span>{{ payAddress }}</span></Text
      >
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
        ><span>{{ courseLocation }}</span></Text
      >
    </Section>

    <Section>
      <Text style="color: red"
        >為便於後續報名確認，課程通知及其他相關事宜，請務必主動加入本協會官方LINE帳號：點擊連結 <Link href="https://lin.ee/6bQnil5">https://lin.ee/6bQnil5</Link> 或 掃描下方 QR
        code。加入後，請主動提供您的報名姓名及連絡電話，以便協會工作人員為您進行後續服務
      </Text>
      <Link href="https://lin.ee/6bQnil5">
        <Img :src="`${siteUrl}/line.png`" alt="line" width="200" height="200" />
      </Link>
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
      <Text>．為維持課程品質，本協會保留一切調整課程內容的權利。</Text>
      <Text>．若有任何問題，歡迎來電洽詢： <Link href="tel:+886-968-047-766">0968-047-766</Link>。 </Text>
      <Text>．再次感謝您對本協會的支持，期待在課堂上與您見面，並預祝學習愉快！</Text>
    </Section>

    <Section>
      <Link :href="siteUrl">
        <Img :src="`${siteUrl}/logo.png`" alt="Logo" width="320" height="240" />
      </Link>
    </Section>
  </Section>
</template>
