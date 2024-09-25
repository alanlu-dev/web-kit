<script setup lang="ts">
import type { OrderSchemaType } from '~/schema/order'

defineProps<{ order: OrderSchemaType }>()

const config = useRuntimeConfig()
</script>

<template>
  <div class="bg:home px:7.5x py:10x r:2x">
    <div class="fg:primary">
      <Iconify icon="material-symbols-light:check-circle-rounded" class="f:65_svg f:134_svg@tablet" />
      <h1 class="h1">報名成功！</h1>
    </div>
    <div class="{max-w:710;mx:auto}">
      <div class="b1-r mt:5x text:left">
        <p>
          感謝您報名參加{{ config.public.siteName }}的<nuxt-link class="fg:primary fg:primary-hover:hover" :to="`/course/${order.課程場次資訊?.課程ID}`">{{
            order.課程場次資訊?.課程資訊_名稱
          }}</nuxt-link
          >。<span class="fg:accent">請注意：報名不代表錄取免費實作資格，請您務必先加入協會的官方LINE帳號，並主動提供報名姓名及聯絡電話</span>，協會將安排人員儘快與您進行初步評估流程。
        </p>
      </div>

      <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
        <p>協會官方 LINE 帳號：<a class="cursor:pointer fg:primary fg:primary-hover:hover" href="https://lin.ee/6bQnil5">https://lin.ee/6bQnil5</a> 或 掃描下方 QR code。 </p>
        <a href="https://lin.ee/6bQnil5" class="block aspect:1/1 max-w:200 mx:auto">
          <Image src="/line.png" class="{aspect:inherit;object:cover} w:full" />
        </a>
      </div>

      <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
        <h3 class="b1-r">重要提醒</h3>
        <div class="list">
          <ul class="fg:font-title">
            <li>報名不代表錄取，協會將根據初步評估結果進行篩選錄取。</li>
            <li>本清潔實作課程完全免費，如錄取無須支付任何費用。</li>
            <li>清潔實作課程名額有限，請盡早加入 LINE，以免錯失重要訊息。</li>
            <li>清潔實作時間與地點將於錄取後另行通知。</li>
            <li>為維持課程品質，本協會保留一切調整課程內容的權利。</li>
            <li>若有任何問題，歡迎來電洽詢： <a href="tel:+886-968-047-766">0968-047-766</a>。</li>
            <li>再次感謝您對本協會的支持，期待在課堂上與您見面，並預祝學習愉快！</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <div class="{max-w:710;mx:auto} mb:20x mt:5x text:left">
          <p class="b1-r px:5x px:11x@tablet">*若有課程相關疑問，請透過客服電話與我們聯繫</p>
        </div> -->
    <div class="">
      <div class="aspect:4/3 max-w:400 mx:auto">
        <Image src="/logo.png" :alt="config.public.siteName" class="{aspect:inherit;object:cover} w:full" />
      </div>
    </div>
  </div>
</template>
