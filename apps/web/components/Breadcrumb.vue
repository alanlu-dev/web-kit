<script setup lang="ts">
interface IProps {
  title?: string
  noLastPage?: boolean
}

const props = defineProps<IProps>()

const links = useBreadcrumbItems()

const processLinks = computed(() => {
  if (props.noLastPage) {
    return links.value.slice(0, -1)
  }
  return links.value
})
</script>

<template>
  <nav aria-label="Breadcrumbs" class="p:6x">
    <ul class="b1-r flex">
      <li v-for="(item, key) in processLinks" :key="key" class="center-content inline-flex" :class="{ 'fg:font-title': key === processLinks.length - 1 }">
        <span v-if="key > 0" class="f:14 fg:#9E9E9E ls:0.25px px:3x"> / </span>
        <NuxtLink v-if="key !== processLinks.length - 1" v-bind="item" class="ls:0.02em mr:-0.02em">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink v-else-if="noLastPage" v-bind="item" class="ls:0.02em mr:-0.02em">
          {{ title ?? item.label }}
        </NuxtLink>
        <span v-else>
          {{ title ?? item.label }}
        </span>
      </li>
    </ul>
  </nav>
</template>
