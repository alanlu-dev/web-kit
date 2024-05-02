<template>
  <div>
    <!-- 輪播 -->
    <HomeBanner />

    <!-- 最新消息 -->
    <HomeNews />

    <!-- 協會介紹 -->
    <HomeIntroduce />

    <!-- 課程資訊 -->
    <HomeCourse />

    <!-- 課程價值 -->
    <img src="/wave.svg" alt="課程價值" class="aspect:390/121 mb:-10% mb:-15%@desktop object:cover w:full z:-1" />
    <section class="flex rel bg:#F2F9FA flex:column pb:10x pb:20x@tablet px:7x">
      <div class="flex {ai:flex-start;flex:row}@tablet ai:center flex:column gap:7x jc:space-around max-w:280>div">
        <div class="center-content flex flex:column">
          <img src="/p/p1.svg" alt="專業認證" class="size:80 size:120@tablet w:full" />
          <p class="h2 title nowrap mb:2x mt:4x">專業認證</p>
          <p class="b1-r text:center">透過協會認證的從業人員擁有專業技能和知識，提高其在行業中的競爭力和信譽。</p>
        </div>
        <div class="center-content flex flex:column">
          <img src="/p/p2.svg" alt="技能養成" class="size:80 size:120@tablet w:full" />
          <p class="h2 title nowrap mb:2x mt:4x">技能養成</p>
          <p class="b1-r text:center">提供高質量的培訓課程，幫助從業人員不斷提升技能，跟上行業最新發展。</p>
        </div>
        <div class="center-content flex flex:column">
          <img src="/p/p3.svg" alt="就業發展" class="size:80 size:120@tablet w:full" />
          <p class="h2 title nowrap mb:2x mt:4x">就業發展</p>
          <p class="b1-r text:center">協會積極推動清潔行業的發展和提升，促進學員的可持續發展和創新。</p>
        </div>
      </div>
    </section>

    <!-- 實績案例 -->
    <section class="flex bg:#F2F9FA flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">實績案例 🚧</h1>
      <div class="b1-r min-h:500 mt:5x mt:10x@tablet text:center">
        <p>TODO</p>
      </div>
    </section>

    <!-- 聯絡我們 -->
    <HomeContact />
  </div>
</template>
