<script setup lang="ts">
definePageMeta({
  title: '關於我們',
  breadcrumb: {
    label: '關於我們',
  },
})

useSeoMeta({
  title: '關於我們',
})
</script>

<template>
  <div>
    <Hero title="關於我們 🚧" />
    <Breadcrumb />

    <section class="px:6x">
      <div class="max-w:screen-md mx:auto my:5x my:10x@tablet">
        <div
          class="center-content flex rel {content:'';abs;inset:0;bg:footer/.8}:before aspect:342/210 aspect:824/277@tablet aspect:1040/322@desktop background-size:cover background:url(/about/cover.png)no-repeat|center|center fg:white p:5x"
        >
          <div class="center-content flex rel flex:column flex:row@2xs gap:2x gap:3x@tablet">
            <nuxt-link class="center-content flex size:20x" to="/">
              <Icon name="Logo" class="size:full"></Icon>
            </nuxt-link>
            <div class="nowrap {ls:0.1em;mr:-0.1em;text:right}">
              <h1 class="h1 f:6vw!@<2xs">中華民國職業清潔認證協會</h1>
              <h2 class="b2-m f:2.5vw!@<2xs">Professional Cleaning Certification Association</h2>
            </div>
          </div>
        </div>
        <div class="b1-r mt:6x text:center">
          <p>中華民國職業清潔認證協會致力於提升清潔行業的專業水準與形象。</p>
          <p>
            我們的使命是透過嚴謹的認證程序和持續的專業培訓，確保清潔人員具備優良的專業素養和技能，以提供客戶高品質的服務。我們秉持著專業、誠信和創新的價值觀，不斷推動清潔行業的發展，促進清潔服務的標準化和規範化。透過我們的努力，我們希望能夠建立起一個受人尊重和信賴的清潔專業認證機構，為清潔人員提供更多的職業發展機會，同時也為社會提供更加乾淨、健康的生活環境。
          </p>
        </div>
        <div class="mt:10x mt:20x@tablet">
          <h3 class="h3 title fg:font-title">合作夥伴</h3>
          <div class="bg:home mt:5x">
            <div class="flex rel ai:flex-start flex:column flex:row@2xs gap:5x jc:space-between p:6x|12x">
              <div class="{aspect:1/1;object:cover;w:full}_img aspect:1/1 flex-basis:200@2xs mx:auto w:80% w:full@2xs">
                <img src="/jie_housekeeper.png" alt="潔管家" />
              </div>
              <div class="b1-r flex:1">
                <p>
                  現代家庭因工作及環境影響，常常無法兼顧工作、家庭，就連清潔等等的煩瑣家事也無法做的完善，為了解決清潔家事問題，潔管家因而創立。自2002年以來，服務過大台中地區公司行號及公家機關，擁有資深經驗團隊，加上超過2000家以上服務中客戶的肯定。潔管家希望在居家清潔服務裡，建立一個雙向平台，一方面提供給消費者迅速且完善的服務，另一方面提供給家事服務員們穩定且優渥的薪資，創造雙贏局面。
                </p>
              </div>
            </div>
          </div>
          <div class="bg:home mt:5x">
            <div class="flex rel ai:flex-start flex:column flex:row@2xs gap:5x jc:space-between p:6x|12x">
              <div class="{aspect:1/1;object:cover;w:full}_img aspect:1/1 flex-basis:200@2xs mx:auto w:80% w:full@2xs">
                <img src="/洪瑞霞.png" alt="巧收納易整理主理人" />
              </div>
              <div class="b1-r flex:1">
                <p>巧收納易整理主理人：洪瑞霞 </p>
                <p>桃園南崁資深整理收納師，2023年目前總計接了243個案子，走進客戶家整理共700多回。接企業講座，探討紊亂背後的亂源。 </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt:10x mt:20x@tablet">
          <h3 class="h3 title fg:font-title">服務據點</h3>
          <div class="h:200 text:center">🚧</div>
        </div>
      </div>
    </section>
  </div>
</template>
