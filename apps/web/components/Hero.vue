<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    bg?: string
  }>(),
  {
    title: 'Title',
    bg: '/hero1.jpg',
  },
)

const bgCls = `background-image:url(${props.bg})`
</script>

<template>
  <section class="rel {content:'';abs;inset:0;bg:footer/.8}:before background-size:cover background:no-repeat|center|center px:6x py:12.5x" :class="[bgCls]">
    <div class="rel fg:white">
      <h1 class="h1 title">{{ title }}</h1>
    </div>
  </section>
</template>
