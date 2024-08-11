<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { OrderSchemaType } from '~/schema/order'

const route = useRoute()
const trans_no = route.params.trans_no
const { data: order } = await useFetch<OrderSchemaType>(`/api/payment/${trans_no}`)

useSeoMeta({
  title: () => '報名結果',
})
</script>

<template>
  <section class="{flex;flex:col}">
    <div class="p:5x|6x pt:10x@tablet px:10x@desktop">
      <div class="{max-w:screen-main;mx:auto} mt:5x text:center">
        <div class="bg:home px:7.5x py:10x r:2x">
          <h2>付款狀態：({{ order?.付款狀態 }}) | RtnMsg: {{ order?.金流訊息 }}</h2>
          <div class="fg:primary">
            <Iconify icon="material-symbols-light:check-circle-rounded" class="f:65_svg f:134_svg@tablet" />
            <h1 class="h1 text:line-through">報名成功！</h1>
          </div>
          <div class="{max-w:710;mx:auto}">
            <p class="b1-r mt:5x text:left text:center@tablet text:line-through">您好，您已報名完成，以下為報名詳細資訊</p>
            <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">訂單編號：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ order?.訂單編號 }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">課程名稱：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ order?.課程安排資訊?.課程資訊_名稱 }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課日期：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ order?.課程安排資訊?.上課日期?.[0] }}</span>
                </div>
              </div>
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課時間：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ order?.課程安排資訊?.上課日期?.[1] }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課地點：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ order?.課程安排資訊?.教室資訊?.地址 }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">付款方式：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ order?.付款方式 }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">付款金額：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>NT$ {{ formatThousand(order?.付款金額!) }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="{max-w:710;mx:auto} mb:20x mt:5x text:left">
          <p class="b1-r px:5x px:11x@tablet">*若有課程相關疑問，請透過客服電話與我們聯繫</p>
        </div>
      </div>
    </div>
  </section>
</template>
b
