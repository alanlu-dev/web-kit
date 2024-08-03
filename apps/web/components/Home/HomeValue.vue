<script setup lang="ts">
// TODO: 設定檔
const title = ['提升清潔專業度', '成為更專業的家事服務人員']
const title2 = ['為什麼我需要清潔認證證照?']
const card = [
  {
    icon: 'guidance:cleaning-room-2',
    title: ['優化專業精準度', '清潔更到位'],
    description: '不同於未受訓的清潔服務人員,更能瞭解住家常用建材及常用清潔劑特性,更快速的對困難清潔處對症下藥。',
  },
  {
    icon: 'HomeValue2',
    title: ['實作導向', '真正學以致用'],
    description: '在職業清潔協會內提供的課程,有別於坊間一兩日的學術研習課程,會加入更多的實作課程,在課程老師協助下帶學生走進客戶家中,從溝通至完成驗收,避免學以不致用。',
  },
  {
    icon: 'teenyicons:certificate-outline',
    title: ['認證加持', '競爭力提升'],
    description: '針對未來想從業人員或已從業人員,職業清潔認証協會提供共 3 等級的職業清潔認證證照,第 1 級清潔職業認證證照需達 1000 小時服務時數,讓學員在產業上更具競爭力。',
  },
]
</script>

<template>
  <section class="bg:home">
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} p:10x|6x px:10x@desktop text:center">
      <div>
        <h1 class="h1 title {flex;flex:col} fg:font-title">
          <span v-for="(t, idx) in title" :key="idx">{{ t }}</span>
        </h1>

        <h3 class="h3 fg:primary mt:4x">
          <span v-for="(t, idx) in title2" :key="idx">{{ t }}</span>
        </h3>
      </div>

      <div class="{grid-cols:1;gap:7x} {grid-cols:3}@xs fg:primary mt:5x mt:10x@tablet">
        <div v-for="item in card" :key="item.icon" class="bg:white p:5x r:2x">
          <Iconify :icon="item.icon" class="f:15x>.icon" />
          <h3 class="h3 {flex;flex:col;jc:center} {flex:row;flex:wrap}@md mt:2x">
            <span v-for="(t, idx) in item.title" :key="idx" class="px:.5x">{{ t }}</span>
          </h3>
          <p class="b2-r fg:font-content mt:4x">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
