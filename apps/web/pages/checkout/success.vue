<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const course_event_id = route.query.course_event_id

const { data: courseEvent } = await useFetch<CourseEventSchemaType>(`/api/course_event/${course_event_id}`, { query: route.query })

useSeoMeta({
  title: () => courseEvent.value?.課程?.課程名稱 || '結帳成功',
})
</script>

<template>
  <section class="{flex;flex:col}">
    <div class="p:5x|6x pt:10x@tablet px:10x@desktop">
      <div class="{max-w:screen-main;mx:auto} mt:5x text:center">
        <div class="bg:home px:7.5x py:10x r:2x">
          <div class="fg:primary">
            <Iconify icon="material-symbols-light:check-circle-rounded" class="f:65_svg f:134_svg@tablet" />
            <h1 class="h1">報名成功！</h1>
          </div>
          <div class="{max-w:710;mx:auto}">
            <p class="b1-r mt:5x text:left text:center@tablet">您好，您已報名完成，以下為報名詳細資訊</p>
            <div class="b2-r {flex;flex:col;gap:5x} bg:base-bg mt:5x p:5x px:11x@tablet r:2x text:left">
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">訂單編號：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ `TODO` }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">課程名稱：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.課程?.課程名稱 }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課日期：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.上課日期?.[0] }}</span>
                </div>
              </div>
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課時間：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.上課日期?.[1] }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課地點：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.教室?.地址 }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">付款方式：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ `信用卡一次付清` }}</span>
                </div>
              </div>

              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">付款金額：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>NT$ {{ formatThousand(courseEvent?.指定價格 || courseEvent?.課程?.價格 || 99999) }} </span>
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
