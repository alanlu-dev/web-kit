<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

interface IProps {
  event: CourseEventSchemaType
}
defineProps<IProps>()
</script>

<template>
  <nuxt-link :key="event.ID" class="flex bg:base-bg flex:column flex:row@tablet overflow:hidden r:2x scale(1.05):hover_img shadow:md" :to="`/course_event/${event.ID}`">
    <div class="rel {max-w:312;aspect:312/260}@tablet {max-w:387;aspect:387/260}@desktop aspect:342/133 flex:1 overflow:hidden">
      <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="event.課程圖片連結" :alt="event.課程標題" />
    </div>
    <div class="b2-r flex:1 p:3x|6x">
      <div class="flex ai:center gap:2x jc:flex-start">
        <CourseLevel :level="event.課程標籤" />
        <p class="b1-b fg:font-title">{{ event.課程標題 }}</p>
        <p class="h3 block@tablet hidden nowrap fg:accent! ml:auto text:right">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
      </div>

      <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
        <div class="center-content flex fg:font-title gap:1x">
          <Iconify class="f:5x" icon="material-symbols-light:date-range-outline-rounded" />
          <p class="nowrap">上課日期：</p>
        </div>
        <div class="flex ai:center flex:wrap jc:flex-start">
          <span>{{ event.上課日期?.start }}</span>
          <span>～</span>
          <span>{{ event.上課日期?.end }}</span>
        </div>
      </div>

      <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
        <div class="center-content flex fg:font-title gap:1x">
          <Iconify class="f:5x" icon="material-symbols-light:location-on-outline" />
          <p class="nowrap">上課地點：</p>
        </div>
        <div class="flex ai:center flex:wrap jc:flex-start">
          <span>{{ event.教室名稱 }}</span>
        </div>
      </div>

      <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
        <div class="center-content flex fg:font-title gap:1x">
          <Iconify class="f:5x" icon="ph:user-thin" />
          <p class="nowrap">報名人數：</p>
        </div>
        <div class="flex ai:center flex:wrap jc:flex-start">
          <span>{{ event.報名人數 }} 名 / {{ event.名額限制 || '∞' }} 名</span>
        </div>
      </div>

      <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
        <div class="center-content flex fg:font-title gap:1x">
          <Iconify class="f:5x" icon="material-symbols-light:cleaning-services-outline-rounded" />
          <p class="nowrap">課程內容：</p>
        </div>
        <div class="flex ai:center flex:wrap jc:flex-start">
          <p class="lines:4">
            🚧
            課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容
            課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容
          </p>
        </div>
      </div>

      <div class="hidden@tablet">
        <hr class="bg:#DBD9D9 h:1 mt:3x" />
        <p class="h3 fg:accent! mt:2x text:right">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
      </div>
    </div>
  </nuxt-link>
</template>
