<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

interface IProps {
  event: CourseEventSchemaType
}
defineProps<IProps>()
</script>

<template>
  <nuxt-link class="flex bg:base-bg flex:row flex:column@tablet overflow:hidden r:2x@tablet scale(1.05):hover_img shadow:md@tablet" :to="`/course_event/${event.ID}`">
    <div class="min-w:40% min-w:unset@tablet pt:2x pt:unset@tablet">
      <div class="rel aspect:147/102 aspect:316/133@tablet overflow:hidden r:2x r:unset@tablet">
        <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="event.課程圖片連結" :alt="event.課程標題" />
      </div>
    </div>

    <div class="p:2x|4x text:left">
      <p class="b1-b fg:primary lines:1">{{ event.課程標題 }} | {{ event.教室名稱 }}</p>
      <p class="b2-r lines:2 lines:3@tablet mt:2x">TODO: 認識居家清潔劑、清潔工具運用、客戶溝通技巧、模擬真實居家案場演練</p>
      <p class="b2-r f:12@<=mobile fg:font-title lines:1 mt:3x mt:8x@tablet">中華民國職業清潔認証協會</p>
      <hr class="bg:#DBD9D9 h:1 mt:2x" />
      <div class="mt:2x text:left">
        <p class="h3 fg:accent!">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
      </div>
    </div>
  </nuxt-link>
</template>
