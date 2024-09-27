<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ModalsContainer } from 'vue-final-modal'

const showDevPanel = useState('showDevPanel', () => false)

const common = useCommonStore()

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'G' && event.shiftKey) {
    showDevPanel.value = !showDevPanel.value
  }
})

const reviewStore = useReviewStore()
const { selected, isFirst, isLast } = storeToRefs(reviewStore)

async function goToAdjacentReview(direction: 'prev' | 'next') {
  const adjacentReview = await reviewStore.getAdjacentData(direction)
  if (adjacentReview) {
    // 更新 UI 或執行其他操作
  }
}
</script>

<template>
  <div class="rel {flex;flex:col} min-h:100vh mx:auto" :class="{ dev: showDevPanel }">
    <Header />

    <ModalsContainer />

    <main class="flex:1">
      <LayoutGrids />
      <slot />
    </main>

    <Footer />

    <ClientOnly>
      <Button
        intent="secondary"
        class="fixed invisible round! {bottom:3x;right:3x;f:6.75x;size:6.75x;min-w:6.75x} {flex;center-content} {bottom:4x;right:4x;f:9x;size:9x;min-w:9x}@tablet {bottom:5x;right:5x;f:10x;size:10x;min-w:10x}@desktop {opacity:1;visible}[show=true] ~300ms|ease ~property:opacity,visibility opacity:0 p:0! z:nav"
        :show="common.scrollY > 200"
        @click="common.scrollY = 0"
      >
        <Iconify class="flex! size:inherit" icon="material-symbols-light:keyboard-arrow-up-rounded" />
      </Button>
    </ClientOnly>

    <Modal modal-id="review" class="{top:-4x;right:2x}_.close-btn {max-w:screen-sm}_.vfm__content" :footer="null">
      <template v-if="selected">
        <div>
          <div class="{flex;flex:col;ai:flex-start;gap:5x} flex:row@xs">
            <div class="flex:1@xs overflow:hidden r:2x w:full">
              <VideoPlayerCover :key="`media-${selected.ID}`" aspect="16/9" :video="selected.影音連結" :img="selected.照片[0]" :alt="selected.照片alt" />
            </div>
            <div class="flex:1.5 text:left">
              <p class="b1-m fg:font-title">學員 {{ selected.學員 }}</p>
              <nuxt-link :to="`/course/${selected.課程ID}`" class="b1-m fg:primary mt:1x">{{ selected.課程資訊_名稱 }}</nuxt-link>
              <p class="b2-r mt:2x">{{ selected.評價 }}</p>
            </div>
          </div>

          <div class="{flex;center-content;gap:2x} mt:auto">
            <button :disabled="isFirst" class="inline-block {fg:divider}:disabled_* mt:5x pointer-events:none:disabled text:center" @click="goToAdjacentReview('prev')">
              <Iconify icon="material-symbols-light:arrow-left-alt" :is-prefix="true">上一則</Iconify>
            </button>
            <button :disabled="isLast" class="inline-block {fg:divider}:disabled_* mt:5x pointer-events:none:disabled text:center" @click="goToAdjacentReview('next')">
              <Iconify icon="material-symbols-light:arrow-right-alt">下一則</Iconify>
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w:full">
          <div class="{flex;flex:col;ai:flex-start;gap:5x} flex:row@xs">
            <div class="flex:1@xs overflow:hidden r:2x w:full">
              <div class="skeleton block aspect:16/9"></div>
            </div>
            <div class="flex:1.5 text:left w:full">
              <p class="b1-m skeleton skeleton--text h:5x my:2x w:30%">_</p>
              <p class="b1-m skeleton skeleton--text h:5x mb:2x mt:1x w:50%">_</p>
              <div class="mt:2x">
                <p class="b2-r skeleton skeleton--text h:5x my:2x w:40%">_</p>
                <p class="b2-r skeleton skeleton--text h:5x my:2x w:70%">_</p>
                <p class="b2-r skeleton skeleton--text h:5x my:2x w:80%">_</p>
              </div>
            </div>
          </div>

          <div class="{flex;center-content;gap:2x} mt:auto">
            <button disabled class="inline-block {fg:divider}:disabled_* mt:5x pointer-events:none:disabled text:center" @click="reviewStore.getAdjacentData('prev')">
              <Iconify icon="material-symbols-light:arrow-left-alt" :is-prefix="true">上一則</Iconify>
            </button>
            <button disabled class="inline-block {fg:divider}:disabled_* mt:5x pointer-events:none:disabled text:center" @click="reviewStore.getAdjacentData('next')">
              <Iconify icon="material-symbols-light:arrow-right-alt">下一則</Iconify>
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
