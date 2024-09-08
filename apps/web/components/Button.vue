<script setup lang="ts">
import cv from 'class-variant'

interface IProps {
  intent?: 'primary' | 'secondary' | 'text'
  loading?: boolean
}

withDefaults(defineProps<IProps>(), {
  intent: 'primary',
})

const btn = cv('btn', {
  intent: {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    text: '',
  },
})
</script>

<template>
  <button :class="btn({ intent })" type="button">
    <Icon v-if="loading" name="mingcute:loading-fill" class="spin mr:2x" />
    <slot />
  </button>
</template>
