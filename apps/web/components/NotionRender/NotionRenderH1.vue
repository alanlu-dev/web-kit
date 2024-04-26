<script setup lang="ts">
import type { NotionHeading1BlockType } from '@alanlu-dev/notion-api-zod-schema'

interface IProps {
  block: NotionHeading1BlockType
}
defineProps<IProps>()
</script>

<template>
  <h1 class="h1 inline-block">
    <NotionRenderBasicText v-if="block.heading_1.rich_text[0]?.type === 'text'" :text="block.heading_1.rich_text[0]" />
  </h1>
</template>
