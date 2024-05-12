<template>
  <footer class="rel bg:footer/.8 fg:white overflow:hidden rtr:100 z:footer">
    <img class="abs block@xs hidden bottom:0 left:0 pointer-events:none w:170" src="/footer.svg" />
    <div class="flex {flex:row;ai:center;gap:0}@xs ai:flex-start flex:column flex:wrap gap:5x jc:space-between p:7x|12x p:10x|20x@xs p:10x|40x@desktop">
      <div class="flex flex:1 gap:3x jc:flex-end@xs min-w:206">
        <div class="center-content flex gap:3x">
          <span class="rounded bg:white size:10x"></span>
          <div class="flex {flex:row;gap:0.2em}@2xs&<xs flex:column">
            <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:7x@2xs font:bold">中華民國職業</p>
            <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:7x@2xs font:bold">清潔認證協會</p>
          </div>
        </div>
      </div>

      <div class="flex flex:5 h:full">
        <ul class="b1-r gap:5x grid-cols:2 mx:auto text:center">
          <li><nuxt-link to="/news">最新消息</nuxt-link></li>
          <li><nuxt-link to="/course">課程資訊</nuxt-link></li>
          <li><nuxt-link to="/case">實績案例</nuxt-link></li>
          <li><nuxt-link to="/about">關於我們</nuxt-link></li>
        </ul>
      </div>

      <div class="b1-r flex:1 min-w:206">
        <p>賀捷實業有限公司</p>
        <p>營業時間 08:00~22:00</p>
        <p>客服電話 0905-757-766</p>
        <p>2024 © 潔管家 版權所有</p>
      </div>
    </div>
    <div class="abs bg:#245464 bottom:0 h:3x left:0 right:0"></div>
  </footer>
</template>
