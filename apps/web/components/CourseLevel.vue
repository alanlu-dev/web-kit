<script setup lang="ts">
import cv from 'class-variant'

interface IProps {
  level?: string
}
withDefaults(defineProps<IProps>(), {
  level: '未知',
})

const tagCv = cv({
  level: {
    未知: 'bg:divider fg:white',
    初階: 'bg:#EBF9E9 fg:#249921',
    進階: 'bg:#FEE9DD fg:#FB753B',
  },
})
</script>

<template>
  <span class="b2-r nowrap p:1x|2x r:5" :class="tagCv({ level })">{{ level }} </span>
</template>
