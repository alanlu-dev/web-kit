<script setup lang="ts">
import type { NotionHeading2BlockType } from '@alanlu-dev/notion-api-zod-schema'

interface IProps {
  block: NotionHeading2BlockType
}
defineProps<IProps>()
</script>

<template>
  <h2 class="h2 inline-block">
    <NotionRenderBasicText v-if="block.heading_2.rich_text[0]?.type === 'text'" :text="block.heading_2.rich_text[0]" />
  </h2>
</template>
