<script setup lang="ts">
import { PlyrVue, usePlyrVue } from 'plyr-vue'
import type { PlyrVueOptions } from 'plyr-vue'

interface IProps {
  src: string
  options?: PlyrVueOptions // https://github.com/sampotts/plyr#options
}

const props = defineProps<IProps>()

const [registerIframePlayer, iframePlayerInstance] = usePlyrVue({
  // https://developers.google.com/youtube/player_parameters?hl=zh-tw#Parameters
  youtube: {
    iv_load_policy: 3,
    playsinline: 1,
    rel: 0,
    enablejsapi: 1,
    origin: window.location.origin,
  },
  ...props.options,
})

function initIframePlayer() {
  iframePlayerInstance.value.source = {
    type: 'video',
    sources: [{ provider: 'youtube', src: props.src }],
  }
}

onMounted(() => {
  if (import.meta.client) {
    nextTick(initIframePlayer)
  }
})
</script>

<template>
  <ClientOnly>
    <PlyrVue v-bind="$attrs" @register="registerIframePlayer"></PlyrVue>
  </ClientOnly>
</template>
