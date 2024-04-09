<script setup lang="ts">
interface IProps {
  icon: String
}

defineProps<IProps>()
</script>

<template>
  <div class="p:2x|4x fg:primary r:1x {fg:#126085;cursor:pointer}:hover inline-flex center-content lh:1.5 ls:0.05em ~300ms|ease">
    <slot />
    <iconify-icon class="f:6x" :icon="icon" />
  </div>
</template>
