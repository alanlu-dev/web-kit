<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseSchemaType } from '~/schema/course'

defineProps<IProps>()

const config = useRuntimeConfig()

interface IProps {
  course: CourseSchemaType
}
</script>

<template>
  <nuxt-link class="{flex;flex:row} {flex:col}@tablet bg:base-bg overflow:hidden r:2x@tablet scale(1.05):hover_img shadow:md@tablet" :to="`/course/${course.ID}`">
    <div class="{min-w:40%;pt:2x} {min-w:unset;pt:unset}@tablet">
      <div class="rel aspect:16/9 cursor:pointer_img overflow:hidden r:2x r:unset@tablet">
        <VideoPlayerCover aspect="16/9" class="{abs;inset:0;full} ~300ms|ease_img" :video="course.影音連結" :img="course.課程照片?.[0]" :alt="course.照片alt || course.名稱" />
      </div>
    </div>

    <div class="p:2x|4x text:left">
      <p class="b2-m fg:primary lines:2">{{ course.名稱 }}</p>
      <p class="b2-r lines:2 lines:3@tablet mt:2x">{{ course.課程基礎資訊?.課程特色.join('、') }}</p>
      <p class="b2-r f:3x!@<=tablet fg:font-title lines:1 mt:3x mt:8x@tablet">{{ config.public.siteName }}</p>
      <hr class="bg:#DBD9D9 h:1 mt:2x" />
      <div class="mt:2x text:left">
        <p class="h3 fg:accent!">NT$ {{ formatThousand(course.價格) }} </p>
      </div>
    </div>
  </nuxt-link>
</template>
