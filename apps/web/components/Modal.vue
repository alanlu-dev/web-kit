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
    content-class="rel {flex;flex:col} b:1|divider bg:base-bg max-w:screen-3xs p:10x|16x r:2x"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <template #default="{ close }">
      <h2 class="h2 title">
        {{ title }}
      </h2>
      <div class="b1-r mt:4x text:center">
        <slot />
      </div>
      <button class="close-btn {abs;right:5x;top:5x} cursor:pointer" @click="() => close()">
        <Iconify icon="material-symbols-light:close-small-outline-rounded" />
      </button>
    </template>
  </VueFinalModal>
</template>
