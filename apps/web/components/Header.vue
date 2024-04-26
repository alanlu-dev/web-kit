<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const showNav = ref(false)
</script>

<template>
  <header id="header" class="center-content flex sticky bg:base-bg left:0 max-w:inherit p:4x|5x p:4x|10x@tablet shadow:md top:0 w:full z:header">
    <div class="center-content flex gap:2x gap:3x@tablet">
      <nuxt-link class="rounded ~background|300ms|ease bg:font-content bg:primary-hover:hover size:6x size:9x@tablet size:10x@desktop" to="/"></nuxt-link>
      <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:6x@tablet f:7x@desktop font:bold">中華民國職業清潔認證協會</p>
    </div>
    <nav class="ml:auto">
      <ul class="b1-r center-content flex@desktop hidden nowrap {ls:0.05em;mr:-0.05em;text:right;~color|300ms|ease}_a fg:primary-hover_a:hover flex:wrap gap-x:8.5x">
        <li><nuxt-link to="/news">最新消息</nuxt-link></li>
        <li><nuxt-link to="/course">課程資訊</nuxt-link></li>
        <li><nuxt-link to="/kit">實績案例</nuxt-link></li>
        <li><nuxt-link to="/faq">常見問題</nuxt-link></li>
        <li><nuxt-link to="/about">關於我們</nuxt-link></li>
      </ul>
    </nav>

    <button class="center-content flex hidden@desktop {f:27;size:27} {f:9x;size:9x}@tablet b:1|font-content bg:base-bg cursor:pointer ml:auto r:2x" @click="showNav = !showNav">
      <Icon class="f:0.6em!_:where(iconify-icon)" icon="material-symbols-light:menu" />
    </button>
  </header>
  <nav id="nav" class="hidden@desktop">
    <VueFinalModal
      v-model="showNav"
      teleport-to="#nav"
      modal-id="nav"
      content-transition="vfm-slide-right"
      overlay-transition="vfm-fade"
      :lock-scroll="false"
      class="top:59! top:68!@tablet top:74!@desktop"
      content-class="abs bg:base-bg bottom:0 right:0 top:0 w:full w:30vw@tablet"
    >
      <div class="rel bg:white h:full ml:auto pt:15x text:center">
        <button class="abs right:5x top:5x" @click="showNav = false">
          <Icon icon="material-symbols-light:close-small-outline-rounded" />
        </button>
        <ul class="b1-r flex {ls:0.05em;mr:-0.05em;text:right;~color|300ms|ease}_a fg:primary-hover_a:hover flex:column gap:6x">
          <li><nuxt-link to="/news">最新消息</nuxt-link></li>
          <li><nuxt-link to="/course">課程資訊</nuxt-link></li>
          <li><nuxt-link to="/kit">實績案例</nuxt-link></li>
          <li><nuxt-link to="/faq">常見問題</nuxt-link></li>
          <li><nuxt-link to="/about">關於我們</nuxt-link></li>
        </ul>
      </div>
    </VueFinalModal>
  </nav>
</template>
