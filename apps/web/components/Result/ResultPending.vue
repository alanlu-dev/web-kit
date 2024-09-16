<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import { addDay, format } from '@formkit/tempo'
import type { OrderSchemaType } from '~/schema/order'

const props = defineProps<{ order: OrderSchemaType }>()

const config = useRuntimeConfig()

const courseDateMinus7 = computed(() => {
  return props.order.課程場次資訊 ? format({ date: addDay(props.order.課程場次資訊.上課日期![2]!, -7), format: 'YYYY/MM/DD', locale: 'zh-TW', tz: 'Asia/Taipei' }) : null
})
</script>

<template>
  <div class="bg:home px:7.5x py:10x r:2x">
    <div class="fg:primary">
      <h1 class="h1">待付款</h1>
    </div>
    <div class="{max-w:710;mx:auto}">
      <p class="b1-r mt:5x text:left text:center@tablet">您尚未完成報名！</p>

      <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
        <h3 class="b1-r">課程資訊</h3>
        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">課程名稱：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.課程場次資訊?.課程資訊_名稱 }}</span>
          </div>
        </div>

        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">課程日期：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.課程場次資訊?.上課日期?.[0] }}</span>
          </div>
        </div>
        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">課程時間：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.課程場次資訊?.上課日期?.[1] }}</span>
          </div>
        </div>

        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">上課地點：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.課程場次資訊?.教室資訊?.地址 }}</span>
          </div>
        </div>
      </div>

      <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
        <h3 class="b1-r">付款資訊</h3>
        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">訂單編號：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.訂單編號 }}</span>
          </div>
        </div>

        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">付款金額：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>NT$ {{ formatThousand(order?.付款金額!) }} </span>
          </div>
        </div>

        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">付款方式：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.付款方式 }}</span>
          </div>
        </div>

        <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
          <p class="nowrap fg:font-title">付款日期：</p>
          <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
            <span>{{ order?.付款日期 }}</span>
          </div>
        </div>
      </div>

      <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
        <h3 class="b1-r">重要提醒</h3>
        <div class="list">
          <ul class="fg:font-title">
            <li>上課當日請攜帶身份證件以便簽到。</li>
            <li>請提供 2 吋(3.7cm x 4.6cm)大頭照兩張以利證書製作。</li>
            <li>本課程將提供清潔用品及工具，您無須自備。</li>
            <li>本課程若有異動，將以電話及電子郵件方式通知。</li>
            <li
              >若因故無法出席，請於 <span>{{ courseDateMinus7 }}</span> 前告知，以便辦理退費事宜。</li
            >
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
