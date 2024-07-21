<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v20.0&appId=895271347480268',
      async: true,
      defer: true,
      crossorigin: 'anonymous',
      nonce: '5RIUbDff',
    },
  ],
})
</script>

<template>
  <footer class="rel bg:footer fg:white overflow:hidden z:footer">
    <div class="flex ai:center flex:1>* flex:column flex:row@tablet flex:wrap gap:5x jc:space-between max-w:screen-max mx:auto px:6x px:10x@desktop py:5x">
      <div class="flex ai:center flex:row flex:column@tablet gap:3x gap:2x@tablet jc:flex-start jc:center@tablet w:full w:unset@tablet">
        <div class="center-content flex {size:9x;min-w:9x}@tablet min-w:6x size:6x">
          <Icon name="Logo" class="f:6x f:9x@tablet"></Icon>
        </div>
        <div class="flex {flex:column;gap:2x}@tablet gap:0.1em">
          <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:7x@tablet font:bold">中華民國職業</p>
          <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:7x@tablet font:bold">清潔認證協會</p>
        </div>
      </div>

      <div class="b2-r flex nowrap ai:flex-start flex:2 flex:1>* gap:5x w:full w:unset@tablet">
        <div>
          <ul class="flex align-self:flex-start flex:column gap:2x mx:auto w:unset w:70@tablet w:100@desktop">
            <li><nuxt-link to="/course_event">找課程</nuxt-link></li>
            <li><nuxt-link to="/instructor">找講師</nuxt-link></li>
            <li><nuxt-link to="/about">關於我們</nuxt-link></li>
            <li><nuxt-link to="/about">協會介紹</nuxt-link></li>
            <li><nuxt-link to="/about">合作夥伴</nuxt-link></li>
          </ul>
        </div>

        <div>
          <div class="flex flex:1 flex:column gap:2x">
            <p>聯絡專線：<a href="tel:+886-905-757-766" class="text:underline">0905-757-766</a></p>
            <p>營業時間：08:00-22:00</p>
            <div class="flex ai:center gap:4.5x jc:flex-start">
              <Iconify icon="ic:baseline-facebook"></Iconify>
              <Iconify icon="ri:line-fill"></Iconify>
            </div>
          </div>
        </div>
      </div>

      <div class="w:full w:unset@tablet">
        <div class="h:full mx:auto@tablet w:242">
          <div id="fb-root"></div>
          <div
            class="fb-page"
            data-href="https://www.facebook.com/facebook"
            data-tabs=""
            data-width="242"
            data-height="102"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="false"
          >
            <blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a> </blockquote>
          </div>
        </div>
      </div>
    </div>

    <div class="b2-r center-content flex nowrap bg:#245464 flex:wrap gap:1x mx:auto px:6x px:10x@desktop py:2x text:center">
      <span>{{ new Date().getFullYear() }} © 中華民國職業清潔認證協會</span>
      <span>版權所有</span>
    </div>
  </footer>
</template>
