<script setup lang="ts">
import cv from 'class-variant'

interface IProps {
  intent?: 'primary' | 'secondary' | 'text'
  loading?: boolean
  iconPrev?: boolean
  icon?: boolean
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
    <Icon v-else-if="iconPrev" :name="iconPrev" class="mr:2x" />
    <slot />
    <Icon v-if="icon" :name="icon" class="f:16 ml:2x" />
  </button>
</template>
