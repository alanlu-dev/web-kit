<script setup lang="ts">
import type { ReviewSchemaType } from '~/schema/review'

interface IProps {
  page: number
  idx: number
  review: ReviewSchemaType
}
const props = defineProps<IProps>()

const reviewStore = useReviewStore()

function handleClick() {
  reviewStore.selectReview(props.page, props.idx)
}
</script>

<template>
  <div class="bg:#F6F7F7 cursor:pointer overflow:hidden r:2x" @click="handleClick">
    <div class="cursor:pointer_img">
      <VideoPlayerCover fake aspect="16/9" :video="review.影音連結" :img="review.照片[0]" :alt="review.照片alt" />
    </div>
    <div class="p:5x|6x text:left">
      <p class="b1-m fg:font-title">學員 {{ review.學員 }}</p>
      <nuxt-link :to="`/course/${review.課程ID}`" class="b1-m fg:primary mt:1x" @click.stop>{{ review.課程資訊_名稱 }}</nuxt-link>
      <p class="b2-r h:105 h:120@tablet lines:5 mt:2x">{{ review.評價 }}</p>
    </div>
  </div>
</template>
