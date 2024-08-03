<script setup lang="ts">
interface IProps {
  item: {
    img: string
    h1: string
    h2: string
  }
  last: boolean
}
defineProps<IProps>()
</script>

<template>
  <div class="rel text:center">
    <div class="{aspect:inherit;object:cover}_img aspect:349/225 overflow:hidden r:2x">
      <nuxt-img :src="item.img" :alt="item.h1" />
    </div>
    <h3 class="h3 mt:3x">{{ item.h1 }}</h3>
    <p class="b1-r nowrap mt:2x">{{ item.h2 }}</p>

    <nuxt-img :hide="last" src="/course_event/arrow.svg" alt="箭頭" class="{abs;middle;right:-16.5x} opacity:0[hide='true'] pointer-events:none size:10x user-select:none" />
  </div>
</template>
