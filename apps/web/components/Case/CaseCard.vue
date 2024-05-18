<script setup lang="ts">
import type { CaseSchemaType } from '~/schema/case'

interface IProps {
  item: CaseSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="ai:flex-start flex flex:column flex:row@desktop rel pb:15x@desktop {content:'';bg:#F2F9FA;abs;top:10x;left:160;bottom;right;z:-1}::before@desktop">
    <div class="{aspect:489/342;object:cover;w:full}_img aspect:489/342 flex:1">
      <img :src="item.封面" alt="課程介紹" class="pointer-events:none user-select:none" />
    </div>
    <div class="flex:1 p:5x|6x pt:5x pt:15.5x@desktop bg:#F2F9FA bg:none@desktop w:full">
      <CaseTag :tag="item.分類" />
      <p class="h3 fg:font-title mt:2x">{{ item.標題 }}</p>
      <p class="b1-r mt:3x lines:4">{{ item.簡介 ?? '(無內容)' }}</p>
      <div class="text:right {abs;bottom:5x;right:6x}@desktop">
        <Button intent="primary" class="ml:auto mt:5x" @click="navigateTo(`/case/${item.ID}`)">繼續閱讀</Button>
      </div>
    </div>
  </div>
</template>
