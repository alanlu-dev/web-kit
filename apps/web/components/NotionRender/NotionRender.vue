<script setup lang="ts">
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'

interface IProps {
  blocks?: NotionBlockType[]
}
defineProps<IProps>()
</script>

<template>
  <div class="w:full">
    <div v-for="block in blocks" :key="block.id" class="w:full">
      <NotionRenderH1 v-if="block.type === 'heading_1'" :block="block" />
      <NotionRenderH2 v-else-if="block.type === 'heading_2'" :block="block" />
      <NotionRenderH3 v-else-if="block.type === 'heading_3'" :block="block" />
      <NotionRenderP v-else-if="block.type === 'paragraph'" :block="block" />
      <p v-else>
        {{ block }}
      </p>
    </div>
  </div>
</template>
