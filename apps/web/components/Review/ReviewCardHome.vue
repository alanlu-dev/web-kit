<script setup lang="ts">
import type { ReviewSchemaType } from '~/schema/review'

interface IProps {
  review: ReviewSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="{flex;flex:col;gap:3x} {flex:row}@md bg:#FAFAFA overflow:hidden p:3x r:2x">
    <div class="flex-basis:40% flex:1|0">
      <VideoPlayerCover aspect="1/1" :video="review.影音連結" :img="review.照片[0]" class="r:2x" />
    </div>
    <div class="b2-r text:left">
      <p class="fg:font-title">學員 {{ review.學員 }}</p>
      <!-- <p class="fg:font-title mt:1x">{{ review.課程資訊_名稱 }}</p> -->
      <nuxt-link :to="`/course/${review.課程ID}`" class="fg:primary mt:1x">{{ review.課程資訊_名稱 }}</nuxt-link>
      <p class="mt:5x">{{ review.評價 }}</p>
    </div>
  </div>
</template>
