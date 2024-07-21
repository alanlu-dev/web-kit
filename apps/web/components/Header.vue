<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const showNav = ref(false)

const nav = [
  { name: '課程資訊', path: '/course_event' },
  { name: '師資陣容', path: '/instructor' },
  { name: '學員評價', path: '/review' },
  { name: '常見問答', path: '/faq' },
  { name: '產業消息', path: '/news' },
  { name: '關於我們', path: '/about' },
]
</script>

<template>
  <header v-bind="$attrs" class="left sticky top bg:footer fg:base-bg shadow:md z:header">
    <div class="flex {pl:10x;pr:5x}@desktop ai:stretch gap:10x@desktop jc:center max-w:screen-max mx:auto px:6x py:4x">
      <nuxt-link class="center-content flex gap:1x" to="/">
        <div class="center-content flex size:6x size:9x@tablet">
          <Icon name="Logo" class="f:6x f:9x@tablet"></Icon>
        </div>
        <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:6x@tablet f:7x@desktop font:bold">中華民國職業清潔認證協會</p>
      </nuxt-link>

      <nav class="ml:auto">
        <ul class="b1-r flex@>=1200 hidden nowrap {f:bold}_a:hover ai:center flex:wrap jc:flex-start">
          <li v-for="item in nav" :key="item.name" class="contents">
            <nuxt-link class="{ls:0.05em;mr:-0.05em;text:right} p:2x|5x" :to="item.path">{{ item.name }}</nuxt-link>
          </li>
        </ul>

        <button
          class="center-content flex hidden@>=1200 {f:6.75x;size:6.75x;min-w:6.75x} {bg:white/.1}:hover {f:9x;size:9x;min-w:9x}@tablet {f:10x;size:10x;min-w:10x}@desktop ~300ms|ease b:1|base-bg cursor:pointer fg:base-bg mr:5x@desktop r:1.5x r:2x@tablet"
          @click="showNav = !showNav"
        >
          <Iconify class="f:0.6em>.icon" icon="material-symbols-light:menu" />
        </button>
      </nav>
    </div>

    <nav id="nav" class="hidden@>=1200">
      <VueFinalModal
        v-model="showNav"
        teleport-to="#nav"
        modal-id="nav"
        content-transition="vfm-slide-right"
        overlay-transition="vfm-fade"
        :lock-scroll="false"
        class="top:59! top:68!@tablet top:74!@desktop"
        content-class="abs bottom right top vw bg:base-bg fg:font-content w:230@tablet"
      >
        <div class="rel vh bg:base-bg ml:auto pt:15x text:center">
          <Iconify icon="material-symbols-light:close-small-outline-rounded" class="abs cursor:pointer f:6x fg:primary-hover:hover right:5x top:5x" @click="showNav = false" />

          <ul class="b1-r flex flex:column gap:2x">
            <li v-for="item in nav" :key="item.name" class="contents">
              <nuxt-link class="~color|300ms|ease fg:primary-hover:hover p:2x|5x" :to="item.path">{{ item.name }}</nuxt-link>
            </li>
          </ul>
        </div>
      </VueFinalModal>
    </nav>
  </header>
</template>
