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
  <nav aria-label="Breadcrumbs" class="max-w:screen-max mx:auto p:4x|3x pl:6x pl:22.5x@tablet">
    <ul class="b1-r flex ai:center jc:flex-start">
      <template v-for="(item, key) in processLinks" :key="key">
        <span v-if="key > 0" class="f:14 fg:#9E9E9E ls:0.25px pointer-events:none user-select:none"> / </span>
        <li class="{font-title}>span contents {fg:primary-hover}_a:hover ~color|300ms|ease_a p:1x|3x>*">
          <NuxtLink v-if="key !== processLinks.length - 1" v-bind="item">
            {{ item.label }}
          </NuxtLink>
          <NuxtLink v-else-if="noLastPage" v-bind="item">
            {{ title ?? item.label }}
          </NuxtLink>
          <span v-else class="fg:font-title">
            {{ title ?? item.label }}
          </span>
        </li>
      </template>
    </ul>
  </nav>
</template>
