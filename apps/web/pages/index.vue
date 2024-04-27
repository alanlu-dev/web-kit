<script setup lang="ts">
import type { GallerySchemaType } from '~/schema/gallery'
import type { NewsSchemaType } from '~/schema/news'

const { data: images } = await useFetch<GallerySchemaType[]>('/api/gallery/首頁-大B')
const { data: news } = await useFetch<NewsSchemaType[]>('/api/news/?page_size=4')

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
    <section class="rel {aspect:1440/481;object:cover;w:full}_img aspect:1440/481 bg:footer/.8">
      <ClientOnly>
        <template #fallback>
          <img v-if="images" v-bind="images[0]" />
        </template>
        <Splide :options="{ arrows: false, autoplay: true, interval: 5000, type: 'loop' }">
          <SplideSlide v-for="image in images" :key="image.圖片">
            <nuxt-link :to="image.導轉連結 || undefined" class="rel">
              <NotionTag :color="image.發布狀態.color" class="abs nowrap p:1x rbl:2x right:0 top:0">{{ image.發布狀態.name }} </NotionTag>
              <img :src="image.圖片" :alt="image.標題" :title="image.標題" />
            </nuxt-link>
          </SplideSlide>
        </Splide>
      </ClientOnly>
      <span class="abs bg:secondary bottom:0 fg:white p:1x right:0 rtl:2x">1440:481</span>
    </section>

    <!-- 最新消息 -->
    <section class="flex flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">最新消息</h1>
      <div class="center-content inline-flex flex:column flex:row@tablet flex:wrap gap:5x gap:12x|6x@tablet gap:12x|11x@desktop mt:5x mt:8x@tablet mx:auto">
        <nuxt-link v-for="i in news" :key="i.ID" class="~color|300ms|ease bb:1|divider fg:primary-hover:hover flex:1|0|45% max-w:400@tablet max-w:500@desktop" :to="`/news/${i.ID}`">
          <p class="b1-r">{{ i.發布日期 }}</p>
          <h3 class="b1-r lines:1 my:2x my:3x@tablet">{{ i.標題 }}</h3>
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
    <section class="flex flex:column py:5x py:10x@tablet">
      <h1 class="h1 title">課程資訊</h1>
      <section class="rel {my:10x}@tablet m:5x|15vw">
        <ClientOnly>
          <template #fallback>
            <div class="text:center"> loading </div>
          </template>
          <Splide
            :has-track="false"
            :options="{
              arrows: true,
              type: 'loop',
              perPage: 3,
              gap: '28px',
              snap: true,
              pagination: false,
              breakpoints: {
                1024: { perPage: 2 },
                600: { perPage: 1 },
              },
            }"
          >
            <div class="splide__arrows splide__arrows--ltr">
              <Button intent="secondary" class="splide__arrow splide__arrow--prev rounded! {size:11.5x!;left:-5em!}@2xs left:-2.5em! p:0! size:9x">
                <Icon icon="material-symbols-light:chevron-left" />
              </Button>
              <Button intent="secondary" class="splide__arrow splide__arrow--next rounded! {size:11.5x!;right:-5em!}@2xs p:0! right:-2.5em! size:9x">
                <Icon icon="material-symbols-light:chevron-right" />
              </Button>
            </div>
            <SplideTrack>
              <SplideSlide v-for="course in courses" :key="course.id" class="pb:0.5x! px:0.5x">
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
                          <p class="nowrap">上課日期：</p>
                          <p>{{ course.date }}</p>
                        </div>
                        <div class="flex ai:center jc:flex-start mt:2x">
                          <p class="nowrap">上課地點：</p>
                          <p>{{ course.place }}</p>
                        </div>
                        <hr class="bg:#DBD9D9 h:1 mt:9x" />
                        <p class="h3 fg:accent! mt:2x text:right">{{ course.price }}</p>
                      </div>
                    </nuxt-link>
                  </div>
                </div>
              </SplideSlide>
            </SplideTrack>
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
    <section class="flex flex:column px:7x py:5x py:10x@tablet">
      <h1 class="h1 title">聯絡我們 🚧</h1>
      <div class="b1-r mt:5x mt:10x@tablet text:center">
        <p>TODO</p>
      </div>
    </section>
  </div>
</template>
