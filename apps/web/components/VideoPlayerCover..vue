<script setup lang="ts">
import type { PlyrVueOptions } from 'plyr-vue'
import type VideoPlayer from './VideoPlayer.client.vue'

interface IProps {
  aspect?: string
  video?: string
  img?: string
  alt?: string
  title?: string
  options?: PlyrVueOptions // https://github.com/sampotts/plyr#options
  fake?: boolean
}

const props = defineProps<IProps>()

const ytId = computed(() => (props.video ? new URL(props.video).searchParams.get('v') : null))
const cover = computed(() => (props.video ? `https://i.ytimg.com/vi/${ytId.value}/maxresdefault.jpg` : props.img))

const chkEl = ref<HTMLInputElement>()
const videoPlayer = ref<ComponentPublicInstance<typeof VideoPlayer>>()
function callInitIframePlayer() {
  if (videoPlayer.value) {
    videoPlayer.value.initIframePlayer()
  }

  chkEl.value!.checked = true
}

const { class: cls, ...filteredAttrs } = useAttrs()
</script>

<template>
  <div class="rel overflow:hidden" :class="`${cls} aspect:${aspect}`">
    <label class="block rel {object:cover;w:full}_img,_.plyr__video-wrapper" :class="`{aspect:${aspect}}_img {aspect:${aspect}!}_img_.plyr__video-wrapper`">
      <Image :src="cover" :alt="alt" :title="title" />
      <input ref="chkEl" type="radio" class="hidden" />

      <template v-if="video && fake">
        <div class="{abs;inset:0} cursor:pointer z:1"></div>
        <div class="{abs;center;middle}">
          <div class="plyr plyr--full-ui plyr--video plyr--html5 plyr--fullscreen-enabled plyr--paused plyr--stopped plyr--pip-supported {abs;center;middle}">
            <div class="plyr__control plyr__control--overlaid" data-plyr="play" aria-pressed="false" aria-label="Play">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
                <path d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path>
              </svg>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="video">
        <div class=":checked~{hidden} {abs;inset:0} cursor:pointer z:1" @click.prevent="callInitIframePlayer"></div>
        <VideoPlayer ref="videoPlayer" v-bind="filteredAttrs" :src="video" class="{abs;center;middle} :checked~{opacity:1}_iframe opacity:0_iframe" :options="options" @click.prevent> </VideoPlayer>
      </template>
    </label>
  </div>
</template>
