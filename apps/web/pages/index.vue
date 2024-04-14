<script setup lang="ts">
const images = [
  {
    src: 'https://images.unsplash.com/photo-1460176449511-ff5fc8e64c35',
    alt: 'Sample 1',
    title: 'Sample 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc',
    alt: 'Sample 2',
    title: 'Sample 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1507160874687-6fe86a78b22e',
    alt: 'Sample 3',
    title: 'Sample 3',
  },
]

const courses = [
  {
    id: 1,
    title: '初級家事清潔課程',
    price: 'NT$3,200',
    tag: '1',
    place: '台中潔管家教室',
    date: '2024/06/01～2024/06/30',
    image: '/course1.png',
  },
  {
    id: 2,
    title: '進階家事清潔課程',
    price: 'NT$3,200',
    tag: '2',
    place: '台中潔管家教室',
    date: '2024/06/01～2024/06/30',
    image: '/course1.png',
  },
  {
    id: 3,
    title: '初級家事清潔課程',
    price: 'NT$3,200',
    tag: '1',
    place: '台中潔管家教室',
    date: '2024/06/01～2024/06/30',
    image: '/course1.png',
  },
]
</script>

<template>
  <div>
    <!-- 輪播 -->
    <section class="rel {aspect:1440/481;object:cover}_img aspect:1440/481 bg:footer/.8">
      <span class="abs bg:secondary bottom:0 fg:white p:1x right:0 rtl:2x z:devPanel">1440:481</span>
      <ClientOnly>
        <template #fallback>
          <img v-bind="images[0]" />
        </template>
        <Splide :options="{ arrows: false, autoplay: true, interval: 5000, type: 'loop' }">
          <SplideSlide v-for="image in images" :key="image.src">
            <img v-bind="image" />
          </SplideSlide>
        </Splide>
      </ClientOnly>
    </section>

    <!-- 最新消息 -->
    <section class="flex flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">最新消息</h1>
      <div class="center-content inline-flex flex:column flex:row@tablet flex:wrap gap:5x gap:12x|6x@tablet gap:12x|11x@desktop mt:5x mt:8x@tablet mx:auto">
        <nuxt-link v-for="i in 4" :key="i" class="~color|300ms|ease bb:1|divider fg:primary-hover:hover flex:1|0|45% max-w:400@tablet max-w:500@desktop" :to="`/news/${i}`">
          <p class="b1-r">2024/03/10</p>
          <h3 class="b1-r lines:1 my:2x my:3x@tablet">最新清潔認證課程：全面涵蓋環保清潔技術</h3>
        </nuxt-link>
      </div>
      <div class="{mt:7.5x}@tablet mb:1.5x mt:6x text:center">
        <nuxt-link to="/news">
          <Icon icon="material-symbols-light:arrow-right-alt">更多消息</Icon>
        </nuxt-link>
      </div>
    </section>

    <!-- 協會介紹 -->
    <section class="rel {content:'';abs;inset:0;bg:footer/.8}:before background-size:cover background:url(/section2.png)|no-repeat|center|center|fixed px:6x py:5x py:10x@tablet">
      <div class="rel fg:white">
        <h1 class="h1 title fg:inherit!">協會介紹</h1>
        <div class="f:3.5x f:4.5x@tablet font:regular mt:3x mt:7.5x@tablet text:center">
          <p>中華民國職業清潔認證協會是一個專業組織，</p>
          <p>致力於提供清潔行業的認證及培訓服務，促進行業發展。</p>
          <p>我們的目標是確保清潔服務的品質和標準，</p>
          <p>並提供專業指導，以支持清潔從業人員的專業成長和發展。</p>
        </div>
      </div>
    </section>

    <!-- 課程資訊 -->
    <section class="flex flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">課程資訊 🚧</h1>
      <section class="rel mt:5x mt:10x@tablet">
        <ClientOnly>
          <template #fallback> TODO </template>
          <Splide
            :options="{
              perPage: 3,
              arrows: true,
              type: 'loop',
              pagination: false,
              breakpoints: { 1024: { perPage: 2 }, 390: { perPage: 1 } },
            }"
          >
            <SplideSlide v-for="course in courses" :key="course.id">
              <div class="text:center">
                <div class="center-content inline-flex flex:wrap gap:12x|11x mx:auto">
                  <nuxt-link class="bg:base-bg overflow:hidden r:2x scale(1.1):hover_img shadow:md" :to="`/course/${course.id}`">
                    <div class="rel aspect:316/133 overflow:hidden">
                      <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="course.image" :alt="course.title" />
                    </div>
                    <div class="p:2x|4x">
                      <div class="flex ai:center gap:2x jc:flex-start">
                        <Level :level="course.tag" />
                        <p class="b1-b fg:font-title">{{ course.title }}</p>
                      </div>
                      <div class="flex ai:center jc:flex-start mt:2x">
                        <p>上課日期：</p>
                        <p>{{ course.date }}</p>
                      </div>
                      <div class="flex ai:center jc:flex-start mt:2x">
                        <p>上課地點：</p>
                        <p>{{ course.place }}</p>
                      </div>
                      <hr class="bg:#DBD9D9 h:1 mt:9x" />
                      <p class="h3 fg:accent! mt:2x text:right">{{ course.price }}</p>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </ClientOnly>
      </section>

      <div class="{mt:7.5x}@tablet mb:1.5x mt:6x text:center">
        <nuxt-link to="/course">
          <Icon icon="material-symbols-light:arrow-right-alt">更多課程</Icon>
        </nuxt-link>
      </div>
    </section>

    <!-- 課程價值 -->
    <section class="flex bg:beryl-10 flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">課程價值 🚧</h1>
      <div class="b1-r mt:5x mt:10x@tablet text:center">
        <p>TODO</p>
      </div>
    </section>

    <!-- 實績案例 -->
    <section class="flex bg:#F2F9FA flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">實績案例 🚧</h1>
      <div class="b1-r mt:5x mt:10x@tablet text:center">
        <p>TODO</p>
      </div>
    </section>

    <!-- 聯絡我們 -->
    <section class="flex flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">聯絡我們 🚧</h1>
      <div class="b1-r mt:5x mt:10x@tablet text:center">
        <p>TODO</p>
      </div>
    </section>
  </div>
</template>
