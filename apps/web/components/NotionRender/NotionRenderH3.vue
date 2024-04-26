<script setup lang="ts">
import type { NotionHeading3BlockType } from '@alanlu-dev/notion-api-zod-schema'

interface IProps {
  block: NotionHeading3BlockType
}
defineProps<IProps>()
</script>

<template>
  <h3 class="h3 inline-block">
    <NotionRenderBasicText v-if="block.heading_3.rich_text[0]?.type === 'text'" :text="block.heading_3.rich_text[0]" />
  </h3>
</template>
