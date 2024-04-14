<template>
  <div>
    <!-- 輪播 -->
    <section>
      <div class="aspect:1440/555 bg:#3A87A0CC"></div>
    </section>
    <!-- 最新消息 -->
    <section class="flex flex:column p:10x">
      <h1 class="h1 {ls:0.15em;ml:0.0725em;mr:-0.0725em;text:center} fg:font-title">最新消息</h1>
      <div class="center-content inline-flex flex:wrap gap:12x|11x mt:8x mx:auto">
        <nuxt-link v-for="i in 4" :key="i" class="bb:1|#868484 flex:1|0|45% max-w:500 pb:4x" to="/news">
          <p class="fg:font-title mb:4x">2024/03/10</p>
          <h3 class="b1-r lines:1">最新清潔認證課程：全面涵蓋環保清潔技術</h3>
        </nuxt-link>
      </div>
      <div class="mt:8x text:center">
        <Icon icon="material-symbols-light:arrow-right-alt">更多消息</Icon>
      </div>
    </section>
    <!-- 協會介紹 -->
    <section class="rel {content:'';abs;inset:0;bg:#3A87A0CC}:before background-attachment:fixed background:url(/section2.png)|top|center|no-repeat p:10x pb:20x">
      <div class="rel fg:white">
        <h1 class="h1 {ls:0.15em;ml:0.0725em;mr:-0.0725em;text:center}">協會介紹</h1>
        <div class="b1-r mt:7.5x text:center">
          <p>中華民國職業清潔認證協會是一個專業組織，</p>
          <p>致力於提供清潔行業的認證及培訓服務，促進行業發展。</p>
          <p>我們的目標是確保清潔服務的品質和標準，</p>
          <p>並提供專業指導，以支持清潔從業人員的專業成長和發展。</p>
        </div>
      </div>
    </section>
    <!-- 課程資訊 -->
    <section class="flex flex:column p:10x">
      <h1 class="h1 {ls:0.15em;ml:0.0725em;mr:-0.0725em;text:center} fg:font-title">課程資訊</h1>
      <div class="center-content inline-flex flex:wrap gap:12x|11x mt:8x mx:auto">
        <nuxt-link class="bg:white r:2x scale(1.1):hover_img" to="/news">
          <div class="rel aspect:316/133 overflow:hidden">
            <img class="abs full ~300ms|ease inset:0 object-fit:cover" src="/course1.png" alt="初級家事清潔課程" />
          </div>
          <div class="p:2x|4x">
            <div class="flex ai:center gap:2x jc:flex-start">
              <span class="b2-r bg:#EBF9E9 fg:#249921 p:1x|2x r:5">初階</span>
              <p class="b1-b fg:font-title">初級家事清潔課程</p>
            </div>
            <div class="flex ai:center jc:flex-start mt:2x">
              <p>上課日期：</p>
              <p>2024/06/01～2024/06/30</p>
            </div>
            <div class="flex ai:center jc:flex-start mt:2x">
              <p>上課地點：</p>
              <p>台中潔管家教室</p>
            </div>
            <hr class="bg:#DBD9D9 h:1 mt:9x" />
            <p class="h3 fg:accent! mt:2x text:right">NT$3,200</p>
          </div>
        </nuxt-link>
      </div>
      <div class="mt:8x text:center">
        <Icon icon="material-symbols-light:arrow-right-alt">更多課程</Icon>
      </div>
    </section>
    <!-- 課程價值 -->
    <section class="rel {content:'';abs;inset:0;bg:#3A87A0CC}:before background-attachment:fixed background:url(/section2.png)|top|center|no-repeat p:10x pb:20x">
      <div class="rel fg:white">
        <h1 class="h1 {ls:0.15em;ml:0.0725em;mr:-0.0725em;text:center}">課程價值</h1>
        <div class="b1-r mt:7.5x text:center">
          <p>TODO</p>
        </div>
      </div>
    </section>
    <!-- 實績案例 -->
    <section class="bg:#F2F9FA p:10x pb:20x">
      <h1 class="h1 {ls:0.15em;ml:0.0725em;mr:-0.0725em;text:center} fg:font-title">實績案例</h1>
      <div class="b1-r mt:7.5x text:center">
        <p>TODO</p>
      </div>
    </section>
    <!-- 聯絡我們 -->
    <section class="p:10x pb:20x">
      <h1 class="h1 {ls:0.15em;ml:0.0725em;mr:-0.0725em;text:center} fg:font-title">聯絡我們</h1>
      <div class="b1-r mt:7.5x text:center">
        <p>TODO</p>
      </div>
    </section>
  </div>
</template>
