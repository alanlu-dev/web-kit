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
    '': '$case-bg:$(home)',
    'home': '$case-bg:#4D8293CC fg:white fg:white_.h3,_.icon',
  },
})
</script>

<template>
  <div class="flex rel {content:'';bg:$(case-bg);abs;top:10x;left:160;bottom;right;z:-1}::before@desktop ai:flex-start flex:column flex:row@desktop pb:15x@desktop" :class="typeCv({ type })">
    <div class="{aspect:489/342;object:cover;w:full}_img aspect:489/342 flex:1">
      <img :src="item.封面[0]" alt="課程介紹" class="pointer-events:none user-select:none" />
    </div>
    <div class="bg:$(case-bg) bg:none@desktop flex:1 p:5x|6x pt:5x pt:15.5x@desktop w:full">
      <CaseTag :tag="item.分類" />
      <p class="h3 fg:font-title mt:2x">{{ item.標題 }}</p>
      <p class="b1-r lines:4 mt:3x">{{ item.簡介 ?? '(無內容)' }}</p>
      <div class="{abs;bottom:5x;right:6x}@desktop mt:7.5x text:right">
        <Iconify v-if="type === 'home'" icon="material-symbols-light:arrow-right-alt" @click="navigateTo(`/case/${item.ID}`)">繼續閱讀</Iconify>
        <Button v-else intent="primary" class="ml:auto mt:5x" @click="navigateTo(`/case/${item.ID}`)">繼續閱讀</Button>
      </div>
    </div>
  </div>
</template>
