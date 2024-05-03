<script setup lang="ts">
import type { NotionParagraphBlockType } from '@alanlu-dev/notion-api-zod-schema'

interface IProps {
  block: NotionParagraphBlockType
}
defineProps<IProps>()
</script>

<template>
  <p class="p inline-block">
    <NotionRenderBasicText v-if="block.paragraph.rich_text[0]?.type === 'text'" :text="block.paragraph.rich_text[0]" />
  </p>
</template>
