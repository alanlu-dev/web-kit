<template>
  <footer class="flex rel ai:center bg:footer/.8 fg:white flex:column flex:row@tablet flex:wrap jc:space-around p:5x p:10x@tablet rtr:100 z:footer">
    <p class="abs text:center top:1x">頁角 🚧</p>
    <img class="abs bottom:0 left:0 pointer-events:none" src="/footer.svg" />

    <div class="center-content flex gap:3x">
      <span class="rounded bg:white size:10x"></span>
      <div>
        <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:7x font:bold">中華民國職業</p>
        <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:7x font:bold">清潔認證協會</p>
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
</template>
