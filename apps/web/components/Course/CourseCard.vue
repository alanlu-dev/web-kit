<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

interface IProps {
  event: CourseEventSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="center-content inline-flex flex:wrap gap:12x|11x mx:auto">
    <nuxt-link class="bg:base-bg overflow:hidden r:2x scale(1.1):hover_img shadow:md" :to="`/course_event/${event.ID}`">
      <div class="rel aspect:316/133 overflow:hidden">
        <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="event.課程圖片連結" :alt="event.課程標題" />
      </div>
      <div class="p:2x|4x text:left">
        <div class="flex ai:center gap:2x jc:flex-start">
          <CourseLevel :level="event.課程標籤" />
          <p class="b1-b fg:font-title">{{ event.課程標題 }}</p>
        </div>
        <div class="flex ai:flex-start jc:flex-start mt:2x">
          <p class="nowrap">上課日期：</p>
          <p class="flex ai:center flex:wrap jc:flex-start">
            <span>{{ event.上課日期?.start }}</span>
            <span>～</span>
            <span>{{ event.上課日期?.end }}</span>
          </p>
        </div>
        <div class="flex ai:flex-start jc:flex-start mt:2x">
          <p class="nowrap">上課地點：</p>
          <p>{{ event.教室名稱 }}</p>
        </div>
        <hr class="bg:#DBD9D9 h:1 mt:9x" />
        <p class="h3 fg:accent! mt:2x text:right">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
      </div>
    </nuxt-link>
  </div>
</template>
