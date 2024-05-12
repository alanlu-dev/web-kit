<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="center-content flex"
    overlay-transition="vfm-fade"
    content-class="flex rel b:1|divider bg:base-bg flex:col max:screen-3xs px:16x py:10x r:2x"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <h2 class="h2 title">
      {{ title }}
    </h2>
    <div class="b1-r mt:4x text:center">
      <slot />
    </div>
    <button class="abs right:5x top:5x" @click="emit('confirm')">
      <Iconfiy icon="material-symbols-light:close-small-outline-rounded" />
    </button>
  </VueFinalModal>
</template>
