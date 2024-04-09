<script setup lang="ts">
import cv from 'class-variant'

interface IProps {
  intent: 'primary' | 'secondary'
}

withDefaults(defineProps<IProps>(), {
  intent: 'primary',
})

const btn = cv('~300ms|ease f:4x font:bold lh:1.375 ls:0.02em p:3x|6x r:1.5x', {
  intent: {
    primary: 'bg:primary bg:#126085:hover fg:white',
    secondary: '{bg:#7BBFE0;fg:white}:hover bg:#D0E6F1 fg:primary',
  },
})
</script>

<template>
  <button :class="btn({ intent })">
    <slot />
  </button>
</template>
