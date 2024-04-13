<script setup lang="ts">
interface IProps {
  icon: String
}

defineProps<IProps>()
</script>

<template>
  <div class="icon">
    <slot />
    <iconify-icon class="f:6x" :icon="icon" />
  </div>
</template>
