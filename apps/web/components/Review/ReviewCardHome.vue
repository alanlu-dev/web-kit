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
      <p class="fg:font-title mt:1x">{{ review.課程名稱 }}</p>
      <p class="mt:5x">{{ review.評價 }}</p>
    </div>
  </div>
</template>
