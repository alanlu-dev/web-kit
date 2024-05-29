<script setup lang="ts">
interface IProps {
  icon: string
  isPrefix?: boolean
}

defineProps<IProps>()
</script>

<template>
  <div class="icon f:6x_:where(iconify-icon)" :class="{ 'icon-text': $slots.default }">
    <iconify-icon v-if="isPrefix" :icon="icon" noobserver />
    <slot />
    <iconify-icon v-if="!isPrefix" :icon="icon" noobserver />
  </div>
</template>
