<script setup lang="ts">
import cv from 'class-variant'

interface IProps {
  tag?: string
}
withDefaults(defineProps<IProps>(), {
  tag: '未知',
})

const tagCv = cv({
  tag: {
    未知: 'bg:divider fg:white',
    課堂實作: 'bg:#E1E9F1 fg:#5784B8 b:1|#5784B8',
    樣品實作: 'bg:#F4ECE7 fg:#CD855D b:1|#CD855D',
    學生成品: 'bg:#F4F7ED fg:#9EC03C b:1|#9EC03C',
  },
})
</script>

<template>
  <div class="inline-block b2-r nowrap p:2x r:1x" :class="tagCv({ tag })">{{ tag }} </div>
</template>
