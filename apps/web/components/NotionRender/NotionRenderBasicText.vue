<script setup lang="ts">
import type { NotionBasicTextType } from '@alanlu-dev/notion-api-zod-schema'
import cv from 'class-variant'

interface IProps {
  text: NotionBasicTextType
}
const props = defineProps<IProps>()

const textCv = cv(
  ({ color }) => color && `bg:notion-bg-${color} fg:notion-${color}`,
  ({ bold }) => bold && 'font:bold',
  ({ italic }) => italic && 'italic',
  ({ strikethrough }) => strikethrough && 'text:line-through',
  ({ underline }) => underline && `bb:2|notion-{props.text.annotations.color}`,
)

const componentToShow = computed(() => (props.text.href ? resolveComponent('NuxtLink') : 'div'))
</script>

<template>
  <component :is="componentToShow" :to="text.href">
    <h1 :class="[textCv(text.annotations), $attrs.class]">
      {{ text.plain_text }}
    </h1>
  </component>
</template>
