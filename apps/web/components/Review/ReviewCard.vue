<script setup lang="ts">
import type { ReviewSchemaType } from '~/schema/review'

interface IProps {
  review: ReviewSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="bg:#F6F7F7 overflow:hidden r:2x">
    <div>
      <VideoPlayerCover aspect="340/235" :video="review.影音連結" :img="review.照片[0]" />
    </div>
    <div class="p:5x|6x">
      <p class="b1-m fg:font-title">學員 {{ review.學員 }}</p>
      <p class="b1-m fg:primary mt:1x">{{ review.課程名稱 }}</p>
      <p class="b1-r scrollbar h:82 mt:2x overflow-y:auto">{{ review.評價 }}</p>
    </div>
  </div>
</template>
