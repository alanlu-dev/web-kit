<script setup lang="ts">
// TODO: 設定檔
const title = ['中華民國職業', '清潔認證協會']
const description = [
  ['協會是經由政府核准合法設立,為提升國內清潔產業專業度,', '致力於推動清潔行業的專業化與發展。'],
  ['秉持「提升清潔服務品質、保障從業人員權益」之宗旨,', '提供完善的清潔技術培訓、技能認證與人才就業服務,', '協助清潔人員晉升職涯,打造優質清潔環境。'],
]
</script>

<template>
  <section>
    <div class="{flex;flex:col;center-content;p:8x|6x} {max-w:screen-max;mx:auto;overflow:hidden} {py:10x}@tablet {flex:row;gap:10x;p:15x|10x}@desktop">
      <div class="{order:unset;mt:unset}@tablet aspect:563/283 max-w:563 mt:4x order:2">
        <Image class="{aspect:inherit;object:cover} r:2x" src="/home/introduce.jpg" :alt="title.join()" />
      </div>

      <div class="text:left">
        <h1 class="h1 title nowrap@desktop {flex;flex:col;jc:center} {flex:row}@2xs fg:font-title my:4x">
          <span v-for="(t, idx) in title" :key="idx">{{ t }}</span>
        </h1>
        <div class="b1-r nowrap@2xs {flex;flex:col;gap:4x}">
          <span v-for="(p, idx) in description" :key="idx" class="{flex;flex:col;jc:center}@2xs">
            <span v-for="(s, sIdx) in p" :key="`${idx}-${sIdx}`">{{ s }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
