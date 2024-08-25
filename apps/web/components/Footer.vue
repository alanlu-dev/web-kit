<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v20.0&appId=895271347480268',
      // async: true,
      defer: true,
      crossorigin: 'anonymous',
      nonce: 'JIbORIoG',
    },
  ],
})
</script>

<template>
  <footer class="rel bg:footer fg:white overflow:hidden z:footer">
    <div class="{flex;flex:col;ai:center;jc:space-between;flex:wrap;gap:5x} {max-w:screen-max;mx:auto} {flex:row}@tablet flex:1>* px:6x px:10x@desktop py:5x">
      <div class="{flex;flex:row;ai:center;jc:flex-start;gap:3x} {flex:col;jc:center;gap:2x}@tablet w:full w:unset@tablet">
        <div class="{flex;center-content} {size:6x;min-w:6x} {size:9x;min-w:9x}@tablet">
          <Icon name="Logo" class="f:6x f:9x@tablet"></Icon>
        </div>
        <div class="{flex;gap:0.1em} {flex:col;gap:2x}@tablet">
          <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:7x@tablet font:bold">中華民國職業</p>
          <p class="nowrap {ls:0.1em;mr:-0.1em;text:right} f:4.5x f:7x@tablet font:bold">清潔認證協會</p>
        </div>
      </div>

      <div class="b2-r nowrap {flex;ai:flex-start;gap:5x} flex:2 flex:1>* w:full w:unset@tablet">
        <div>
          <ul class="{flex;flex:col;gap:2x} align-self:flex-start mx:auto w:unset w:70@tablet w:100@desktop">
            <li><nuxt-link to="/course">找課程</nuxt-link></li>
            <li><nuxt-link to="/instructor">找講師</nuxt-link></li>
            <li><nuxt-link to="/about">關於我們</nuxt-link></li>
            <li><nuxt-link to="/about">協會介紹</nuxt-link></li>
            <li><nuxt-link to="/about">合作夥伴</nuxt-link></li>
          </ul>
        </div>

        <div>
          <div class="{flex;flex:col;gap:2x} flex:1">
            <p>聯絡專線：<a href="tel:+886-968-047-766" class="text:underline">0968-047-766</a></p>
            <p>營業時間：08:00-22:00</p>
            <div class="{flex;ai:center;jc:flex-start;gap:4.5x}">
              <div intent="text" class="bg:#D0E6F1! r:2x" @click="navigateTo('https://liff.line.me/1645278921-kWRPP32q/?accountId=404maqcq', { external: true })">
                <Iconify icon="ri:line-fill" :is-prefix="true" class="fg:#07B727_svg gap:1x">課程諮詢</Iconify>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w:full w:unset@tablet">
        <div class="h:full mx:auto@tablet w:300@lg">
          <div id="fb-root"></div>
          <div
            class="fb-page"
            data-href="https://www.facebook.com/profile.php?id=100083157557892"
            data-tabs=""
            data-width="500px"
            data-height=""
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="false"
          >
            <blockquote cite="https://www.facebook.com/profile.php?id=100083157557892" class="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/profile.php?id=100083157557892">中華民國職業清潔認證協會 PCCA</a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>

    <div class="b2-r nowrap {flex;center-content;flex:wrap;gap:1x} bg:#245464 mx:auto p:2x|6x px:10x@desktop text:center">
      <span>{{ new Date().getFullYear() }} © 中華民國職業清潔認證協會</span>
      <span>版權所有</span>
    </div>
  </footer>
</template>
