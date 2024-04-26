<script setup lang="ts">
interface IProps {
  icon: string
}

defineProps<IProps>()
</script>

<template>
  <div class="icon f:6x_:where(iconify-icon)" :class="{ 'icon-text': $slots.default }">
    <slot />
    <iconify-icon :icon="icon" />
  </div>
</template>
