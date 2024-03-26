<script setup lang="ts">
const group = useRoute().params.group
</script>

<template>
  <div>
    <h2 class="mt:4x">users-[{{ group }}]</h2>
    <div class="flex gap:4x mt:4x">
      <button class="btn" @click="$router.push(`/users-admin/reload-${(Math.random() * 100).toFixed()}`)">Keyed child</button>
      <button class="btn" @click="$router.push(`/users-admin/static-${(Math.random() * 100).toFixed()}`)">Non-keyed child</button>
    </div>
    <div class="mt:4x">
      <NuxtPage />
    </div>
  </div>
</template>
