<script setup lang="ts">
interface IProps {
  item: {
    img: string
    h1: string
    h2: string
  }
  last?: boolean
}
defineProps<IProps>()
</script>

<template>
  <div class="h:full text:center">
    <div class="{flex;flex:col}">
      <div class="flex-basis:100% w:100%">
        <VideoPlayerCover aspect="349/225" class="r:2x" :img="item.img" :alt="item.h1" />
      </div>
      <!-- <div class="{aspect:inherit;object:cover}_img aspect:349/225 flex-basis:100% overflow:hidden r:2x w:100%">
        <Image :src="item.img" :alt="item.h1" />
      </div> -->
      <h3 class="h3 mt:3x">{{ item.h1 }}</h3>
      <p class="b1-r mt:2x">{{ item.h2 }}</p>
    </div>

    <Image :hide="last" src="/course/arrow.svg" alt="箭頭" class="{abs;middle} {size:8x;right:-13.5x} {size:10x;right:-17.5x}@md opacity:0[hide='true'] pointer-events:none user-select:none" />
  </div>
</template>
