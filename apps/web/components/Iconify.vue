<script setup lang="ts">
interface IProps {
  icon: string
  isPrefix?: boolean
}

defineProps<IProps>()
</script>

<template>
  <div class="iconify {f:6x}_:where(svg)" :class="{ 'iconify-text': $slots.default }">
    <Icon v-if="isPrefix" :name="icon" />
    <slot />
    <Icon v-if="!isPrefix" :name="icon" />
  </div>
</template>
