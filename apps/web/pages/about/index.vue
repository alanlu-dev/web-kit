<script setup lang="ts">
// const { $gsap, $ScrollTrigger } = useNuxtApp()

definePageMeta({
  title: '關於我們',
  breadcrumb: {
    label: '關於我們',
  },
})

// onMounted(() => {
// if (import.meta.client) {
//   $gsap.utils.toArray('[data-aos]').map((el) => {
//     $ScrollTrigger.create({
//       trigger: el,
//       start: 'top top',
//       end: 'bottom 50%+=100px',
//       toggleClass: { targets: el, className: '@fadeInUp|1s' },
//     })
//   })
// }
// })

useSeoMeta({
  title: '關於我們',
})

// 合作夥伴資廖
const data = [
  {
    name: '潔管家',
    img: '/about/jie_housekeeper.png',
    content: [
      '現代家庭因工作及環境影響，常常無法兼顧工作、家庭，就連清潔等等的煩瑣家事也無法做的完善，為了解決清潔家事問題，潔管家因而創立。自2002年以來，服務過大台中地區公司行號及公家機關，擁有資深經驗團隊，加上超過2000家以上服務中客戶的肯定。潔管家希望在居家清潔服務裡，建立一個雙向平台，一方面提供給消費者迅速且完善的服務，另一方面提供給家事服務員們穩定且優渥的薪資，創造雙贏局面。',
    ],
  },
  {
    name: '洪瑞霞',
    img: '/about/洪瑞霞.png',
    content: ['巧收納易整理主理人：洪瑞霞', '桃園南崁資深整理收納師，', '2023年目前總計接了243個案子，', '走進客戶家整理共700多回。', '接企業講座，探討紊亂背後的亂源。'],
  },
]
</script>

<template>
  <div>
    <Hero title="關於我們" />
    <Breadcrumb />

    <div class="p:5x|6x py:10x@tablet">
      <div class="{max-w:screen-main;mx:auto} px:5x@desktop">
        <section class="rel {abs;center;middle}>div aspect:342/210 aspect:1040/322@xs overflow:hidden r:2x" data-aos="fade-up">
          <div class="{content:'';abs;inset:0;bg:footer/.8}::before bg:cover bg:url(/about/cover.png)|no-repeat|center|42%"> </div>
          <div class="{flex;flex:col;center-content;gap:3x} {flex:row;gap:5x}@xs fg:white">
            <nuxt-link class="{flex;center-content} {min-w:20x;size:20x} {min-w:22x;size:22x}@desktop" to="/">
              <Icon name="Logo" class="size:full"></Icon>
            </nuxt-link>
            <div class="nowrap f:medium ls:0.1em text:center">
              <h1 class="f:6vw f:10x@xs">中華民國職業清潔認證協會</h1>
              <h3 class="f:2.7vw f:5x@xs line-h:1.4">Professional Cleaning Certification Association</h3>
            </div>
          </div>
        </section>

        <section class="b1-r mt:6x text:center" data-aos="fade-up" data-aos-delay="200">
          <p>中華民國職業清潔認證協會致力於提升清潔行業的專業水準與形象。</p>
          <p>
            我們的使命是透過嚴謹的認證程序和持續的專業培訓，確保清潔人員具備優良的專業素養和技能，以提供客戶高品質的服務。我們秉持著專業、誠信和創新的價值觀，不斷推動清潔行業的發展，促進清潔服務的標準化和規範化。透過我們的努力，我們希望能夠建立起一個受人尊重和信賴的清潔專業認證機構，為清潔人員提供更多的職業發展機會，同時也為社會提供更加乾淨、健康的生活環境。
          </p>
        </section>

        <section class="mt:10x mt:20x@tablet" data-aos="fade-up">
          <h3 class="h3 title fg:font-title">合作夥伴</h3>

          <div class="{flex;flex:col;gap:5x} mt:5x">
            <AboutCard v-for="item in data" :key="item.name" v-bind="item" />
          </div>
        </section>

        <AboutContact class="mt:15x mt:20x@tablet" data-aos="fade-up" />

        <div class="pb:10x pb:15x@tablet"></div>
      </div>
    </div>
  </div>
</template>
