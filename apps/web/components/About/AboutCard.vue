<script setup lang="ts">
defineProps<{
  name: string
  img: string
  content: Array<string>
}>()
</script>

<template>
  <div class="bg:home p:6x|12x r:2x">
    <div class="{flex;flex:col;gap:5x} {flex:row}@2xs">
      <div class="flex-basis:200@2xs">
        <div class="aspect:1/1 mx:auto overflow:hidden r:2x w:80% w:full@2xs">
          <nuxt-img class="{aspect:inherit;object:cover}" :src="img" :alt="name" />
        </div>
      </div>
      <div class="b1-r flex:1">
        <p v-for="(p, idx) in content" :key="`${name}-${idx}`">{{ p }}</p>
      </div>
    </div>
  </div>
</template>
