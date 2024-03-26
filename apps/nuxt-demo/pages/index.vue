<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div>
    <h2>[Index]</h2>
    <div class="flex gap:4x mt:4x">
      <NuxtLink class="btn" :to="localePath('/users-admin')">users-admin</NuxtLink>
    </div>
  </div>
</template>
