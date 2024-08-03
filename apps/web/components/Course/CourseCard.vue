<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

interface IProps {
  event: CourseEventSchemaType
}
defineProps<IProps>()
</script>

<template>
  <nuxt-link class="{flex;flex:row} {flex:col}@tablet bg:base-bg overflow:hidden r:2x@tablet scale(1.05):hover_img shadow:md@tablet" :to="`/course_event/${event.ID}`">
    <div class="{min-w:40%;pt:2x} {min-w:unset;pt:unset}@tablet">
      <div class="rel aspect:147/102 aspect:316/133@tablet overflow:hidden r:2x r:unset@tablet">
        <nuxt-img class="{abs;inset:0;full} ~300ms|ease object:cover" :src="event.課程?.課程照片?.[0]" :alt="event.課程?.課程名稱" />
      </div>
    </div>

    <div class="p:2x|4x text:left">
      <p class="b1-b fg:primary lines:1">{{ event.課程?.課程名稱 }} | {{ event.教室?.名稱 }}</p>
      <p class="b2-r lines:2 lines:3@tablet mt:2x">{{ event.課程?.課程特色資訊?.map((i) => i?.課程特色).join('、') }}</p>
      <p class="b2-r f:12@<=mobile fg:font-title lines:1 mt:3x mt:8x@tablet">中華民國職業清潔認証協會</p>
      <hr class="bg:#DBD9D9 h:1 mt:2x" />
      <div class="mt:2x text:left">
        <p class="h3 fg:accent!">NT$ {{ formatThousand(event.指定價格 || event.課程?.價格 || 99999) }} </p>
      </div>
    </div>
  </nuxt-link>
</template>
