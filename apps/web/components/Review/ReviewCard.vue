<script setup lang="ts">
import type { ReviewSchemaType } from '~/schema/review'

interface IProps {
  review: ReviewSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="bg:#F6F7F7 overflow:hidden r:2x">
    <div class="aspect:340/235">
      <VideoPlayerCover v-if="review.影音連結" aspect="340/235" :src="review.影音連結" />
      <img v-else class="{aspect:340/235;object:cover;w:full}" :src="review.照片[0]" alt="學員評價" />
    </div>
    <div class="p:5x|6x">
      <p class="b1-m fg:font-title">學員 {{ review.學員 }}</p>
      <p class="b1-m fg:primary mt:1x">{{ review.課程名稱 }}</p>
      <p class="b1-r scrollbar h:82 mt:2x overflow-y:auto">{{ review.評價 }}</p>
    </div>
  </div>
</template>
