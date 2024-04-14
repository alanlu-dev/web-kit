<script setup lang="ts">
import cv from 'class-variant'

interface IProps {
  level: string
}
defineProps<IProps>()

const tagText: Record<string, string> = {
  '1': '初階',
  '2': '進階',
}

const tagCv = cv('btn', {
  level: {
    '1': 'bg:#EBF9E9 fg:#249921',
    '2': 'bg:#FEE9DD fg:#FB753B',
  },
})
</script>

<template>
  <span class="b2-r nowrap p:1x|2x r:5" :class="tagCv({ level })">{{ tagText[level] ?? '未知' }}</span>
</template>
