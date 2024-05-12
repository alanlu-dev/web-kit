<script setup lang="ts">
const links = useBreadcrumbItems()
</script>

<template>
  <nav aria-label="Breadcrumbs" class="p:6x">
    <ul class="b1-r flex">
      <li v-for="(item, key) in links" :key="key" class="center-content inline-flex" :class="{ 'fg:font-title': key === links.length - 1 }">
        <span v-if="key > 0" class="f:14 fg:#9E9E9E ls:0.25px px:3x"> / </span>
        <NuxtLink v-bind="item" class="ls:0.02em mr:-0.02em">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
