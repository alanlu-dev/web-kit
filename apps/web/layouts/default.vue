<template>
  <div class="flex flex:column max-w:screen-max min-h:100vh mx:auto">
    <header class="center-content flex bg:white p:4x|10x">
      <div class="center-content flex gap:3x">
        <nuxt-link class="rounded bg:font-content h:40 w:40" to="/">ICON</nuxt-link>
        <p class="f:7x font:bold ls:0.1em mr:-0.1em text:right white-space:nowrap">中華民國職業清潔認證協會</p>
      </div>
      <nav class="ml:auto">
        <ul class="b1-r center-content flex {ls:0.05em;mr:-0.05em;text:right}_a flex:wrap gap-x:64 white-space:nowrap">
          <li><nuxt-link to="/news">最新消息</nuxt-link></li>
          <li><nuxt-link to="/course">課程資訊</nuxt-link></li>
          <li><nuxt-link to="/kit">實績案例</nuxt-link></li>
          <li><nuxt-link to="/faq">常見問題</nuxt-link></li>
          <li><nuxt-link to="/about">關於我們</nuxt-link></li>
        </ul>
      </nav>
    </header>
    <main class="flex:1">
      <slot />
    </main>
    <footer class="flex rel ai:center bg:#3A87A0 fg:white jc:space-around p:10x rtr:100">
      <img class="abs bottom:0 left:0" src="/footer.svg" />
      <div class="center-content flex gap:3x">
        <span class="rounded bg:white h:40 w:40"></span>
        <div>
          <p class="f:7x font:bold ls:0.1em mr:-0.1em text:right white-space:nowrap">中華民國職業</p>
          <p class="f:7x font:bold ls:0.1em mr:-0.1em text:right white-space:nowrap">清潔認證協會</p>
        </div>
      </div>

      <ul class="b1-r gap:5x grid-cols:2">
        <li><nuxt-link to="/news">最新消息</nuxt-link></li>
        <li><nuxt-link to="/course">課程資訊</nuxt-link></li>
        <li><nuxt-link to="/kit">實績案例</nuxt-link></li>
        <li><nuxt-link to="/about">關於我們</nuxt-link></li>
      </ul>

      <div class="b1-r">
        <p>賀捷實業有限公司</p>
        <p>營業時間 08:00~22:00</p>
        <p>客服電話 0905-757-766</p>
        <p>2024 © 潔管家 版權所有</p>
      </div>
    </footer>
  </div>
</template>
