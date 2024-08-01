<script setup lang="ts">
import type { PlyrVueOptions } from 'plyr-vue'

interface IProps {
  aspect?: string
  src: string
  options?: PlyrVueOptions // https://github.com/sampotts/plyr#options
}

const props = defineProps<IProps>()

const ytId = computed(() => new URL(props.src).searchParams.get('v'))
const cover = computed(() => `https://i.ytimg.com/vi/${ytId.value}/maxresdefault.jpg`)

const { class: cls, ...filteredAttrs } = useAttrs()
</script>

<template>
  <div class="rel" :class="cls">
    <label class="block rel {object:cover;w:full}_img,_.plyr__video-wrapper" :class="`{aspect:${aspect}!}_img,_.plyr__video-wrapper aspect:${aspect}`">
      <nuxt-img :src="cover" alt="影片封面" class="abs full" />
      <input type="radio" class="hidden" />
      <div class="abs :checked~{hidden} inset:0 z:1"></div>
      <VideoPlayer v-bind="filteredAttrs" :src="src" class=":checked~{opacity:1}_iframe opacity:0_iframe" :options="options"></VideoPlayer>
    </label>
  </div>
</template>
