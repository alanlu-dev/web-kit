<script setup lang="ts">
import type { OrderSchemaType } from '~/schema/order'

const route = useRoute()
const trans_no = route.params.trans_no
const { data: order } = await useApiFetch<OrderSchemaType>(`/api/payment/${trans_no}`)

useSeoMeta({
  title: '報名結果',
})
</script>

<template>
  <section class="{flex;flex:col}">
    <div class="p:5x|6x pt:10x@tablet px:10x@desktop">
      <div class="{max-w:screen-main;mx:auto} mt:5x text:center">
        <template v-if="order?.訂單狀態 === '金流:付款成功'">
          <ResultSuccess :order="order" />
        </template>
        <template v-else-if="order?.訂單狀態 === '金流:待現金付款'">
          <ResultOffline :order="order" />
        </template>
        <div v-else-if="order?.訂單狀態 === '金流:待付款'">
          <ResultPending :order="order" />
        </div>
        <div v-else-if="order?.訂單狀態.startsWith('面試')">
          <ResultFree :order="order" />
        </div>
        <div v-else>
          <div class="fg:accent">
            <h1 class="h1">報名失敗！</h1>
          </div>
          <div class="{max-w:710;mx:auto}">
            <p class="b1-r mt:5x text:left text:center@tablet">很抱歉！您的付款並未成功，錯誤如下：</p>
            <p class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x">{{ order?.金流訊息 }}</p>
          </div>
          <div class="{flex;center-content;gap:4x} {mt:15x;gap:10x}@tablet my:10x">
            <Button intent="secondary" class="nowrap" @click="navigateTo(`/course/${order?.課程場次資訊?.課程ID}`)">回課程資訊頁</Button>
            <Button intent="primary" class="nowrap" @click="navigateTo(`/checkout/${order?.課程場次ID}`)">重新報名</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
b
