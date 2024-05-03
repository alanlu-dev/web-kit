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
    class="flex center-content"
    overlay-transition="vfm-fade"
    content-class="rel flex flex:col max:3xs px:16x py:10x  bg:base-bg r:2x b:1|divider"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <h2 class="h2 title">
      {{ title }}
    </h2>
    <div class="b1-r text:center mt:4x">
      <slot />
    </div>
    <button class="abs right:5x top:5x" @click="emit('confirm')">
      <Icon icon="material-symbols-light:close-small-outline-rounded" />
    </button>
  </VueFinalModal>
</template>
