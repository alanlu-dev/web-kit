<script setup lang="ts">
import { Container, Img, Link, Section, Text } from '@vue-email/components'

interface IProps {
  siteUrl: string
  siteName: string
  courseName: string
  courseLink: string
  studentName: string
}

defineProps<IProps>()
</script>

<template>
  <Head>
    <meta charset="utf-8" />
  </Head>
  <Section>
    <Section>
      <Text>
        親愛的 <span>{{ studentName }}</span> ，您好！
      </Text>
      <Text>
        感謝您報名參加{{ siteName }}的【
        <strong>
          <Link :href="courseLink">{{ courseName }}</Link>
        </strong>
        】。
        <span style="color: red"> 請注意！報名不代表錄取免費實作資格，請您務必先加入協會的官方 LINE 帳號，並主動提供報名姓名及連絡電話 </span>
        ，協會將安排人員盡快與您進行初步評估流程。
      </Text>
    </Section>

    <Section>
      <Text>協會官方 LINE 帳號：<Link href="https://lin.ee/6bQnil">https://lin.ee/6bQnil</Link> 或掃描下方 QR code。</Text>
      <Link href="https://lin.ee/6bQnil5">
        <Img :src="`${siteUrl}/line.png`" alt="line" width="200" height="200" />
      </Link>
    </Section>

    <Section>
      <Text><strong>重要提醒</strong></Text>
      <Text>．報名不代表錄取，協會將根據初步評估結果進行篩選錄取。</Text>
      <Text>．本清潔實作課程完全免費，如錄取無須支付任何費用。</Text>
      <Text>．清潔實作課程名額有限，請盡早加入 LINE，以免錯失重要訊息。</Text>
      <Text>．清潔實作時間與地點將於錄取後另行通知。</Text>
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
