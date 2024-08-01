<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    bg?: string
  }>(),
  {
    title: 'Title',
  },
)

// '/hero/hero3.jpg  1-3 隨機
const bg = computed(() => {
  if (props.bg) return props.bg
  const num = Math.floor(Math.random() * 3) + 1
  return `/hero/hero${num}.jpg`
})

const bgCls = `background-image:url(${bg.value})`
</script>

<template>
  <section class="rel">
    <div class="{content:'';abs;inset:0;bg:footer/.8}::before bg:cover bg:no-repeat|center|65% h:100 h:152@tablet" :class="[bgCls]"></div>
    <div class="abs center center-content flex middle">
      <h1 class="h1 title fg:white">{{ title }}</h1>
    </div>
  </section>
</template>
