<script setup lang="ts">
interface IProps {
  color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  color: 'default',
})

const cls = `bg:notion-bg-${props.color} fg:notion-${props.color}`
</script>

<template>
  <span :class="cls">
    <slot />
  </span>
</template>
