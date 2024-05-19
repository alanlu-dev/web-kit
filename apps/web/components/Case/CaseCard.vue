<script setup lang="ts">
import cv from 'class-variant'
import type { CaseSchemaType } from '~/schema/case'

interface IProps {
  item: CaseSchemaType
  type?: 'home' | ''
}
withDefaults(defineProps<IProps>(), {
  type: '',
})

const typeCv = cv({
  type: {
    '': '$case-bg:#F2F9FA',
    'home': '$case-bg:#4D8293CC fg:white fg:white_.h3,_.icon',
  },
})
</script>

<template>
  <div class="ai:flex-start flex flex:column flex:row@desktop rel pb:15x@desktop {content:'';bg:$(case-bg);abs;top:10x;left:160;bottom;right;z:-1}::before@desktop" :class="typeCv({ type })">
    <div class="{aspect:489/342;object:cover;w:full}_img aspect:489/342 flex:1">
      <img :src="item.封面[0]" alt="課程介紹" class="pointer-events:none user-select:none" />
    </div>
    <div class="flex:1 p:5x|6x pt:5x pt:15.5x@desktop bg:$(case-bg) bg:none@desktop w:full">
      <CaseTag :tag="item.分類" />
      <p class="h3 fg:font-title mt:2x">{{ item.標題 }}</p>
      <p class="b1-r mt:3x lines:4">{{ item.簡介 ?? '(無內容)' }}</p>
      <div class="text:right mt:7.5x {abs;bottom:5x;right:6x}@desktop">
        <Iconfiy v-if="type === 'home'" @click="navigateTo(`/case/${item.ID}`)" icon="material-symbols-light:arrow-right-alt">繼續閱讀</Iconfiy>
        <Button v-else intent="primary" class="ml:auto mt:5x" @click="navigateTo(`/case/${item.ID}`)">繼續閱讀</Button>
      </div>
    </div>
  </div>
</template>
