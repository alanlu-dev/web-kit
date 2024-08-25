<script setup lang="ts">
import type { PartnerSchemaType } from '~/schema/partner'

defineProps<{
  partner: PartnerSchemaType
}>()
</script>

<template>
  <div class="bg:home p:6x|12x r:2x">
    <div class="{flex;flex:col;gap:5x} {flex:row}@2xs">
      <div class="flex-basis:200@2xs">
        <div class="aspect:1/1 mx:auto overflow:hidden r:2x w:80% w:full@2xs">
          <Image class="{aspect:inherit;object:cover}" :src="partner.圖片[0]" :alt="partner.名稱" />
        </div>
      </div>
      <div class="b1-r flex:1">
        <p v-for="(p, idx) in partner.介紹?.split('\n')" :key="`${partner.名稱}-${idx}`">{{ p }}</p>
      </div>
    </div>
  </div>
</template>
