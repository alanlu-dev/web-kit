<script setup lang="ts">
import type { ReviewSchemaType } from '~/schema/review'

const route = useRoute()
const { data: reviews } = await useFetch<ReviewSchemaType[]>('/api/review', { query: { ...route.query, page_size: 10 } })
</script>

<template>
  <div class="rel">
    <section class="max-w:screen-max mx:auto py:10x text:center">
      <h1 class="h1 title fg:font-title">學員滿意度 93.8%</h1>
      <h3 class="h3 center-content flex flex:column flex:row@desktop mt:4x">
        <span>致力營造優質的學習環境,</span>
        <span>持續精進教學,為學員提供更好的學習體驗</span>
      </h3>

      <div class="rel mt:5x mt:10x@tablet">
        <ClientOnly>
          <template #fallback>
            <div class="text:center"> loading </div>
          </template>

          <Splide
            :has-track="false"
            :options="{
              arrows: true,
              type: 'loop',
              snap: true,
              pagination: false,
              perPage: 2,
              gap: '40px',
              breakpoints: {
                1024: {
                  perPage: 1,
                  gap: '20px',
                },
              },
            }"
          >
            <div class="splide__arrows splide__arrows--ltr abs middle w:full">
              <div class="rel h:full max-w:screen-lg mx:auto w:full">
                <Button intent="secondary" class="splide__arrow splide__arrow--prev round! {f:6.75x;size:6.75x}! {f:9x;size:9x}!@tablet {f:10x;size:10x}!@desktop p:0!">
                  <Iconify class="flex! {f:.6em;transform:unset}!>svg" icon="material-symbols-light:chevron-left" />
                </Button>
                <Button intent="secondary" class="splide__arrow splide__arrow--next round! {f:6.75x;size:6.75x}! {f:9x;size:9x}!@tablet {f:10x;size:10x}!@desktop p:0!">
                  <Iconify class="flex! {f:.6em;transform:unset}!>svg" icon="material-symbols-light:chevron-right" />
                </Button>
              </div>
            </div>
            <SplideTrack class="max-w:1080 mx:auto w:60% w:full@desktop">
              <SplideSlide v-for="review in reviews" :key="review.ID">
                <div class="flex bg:#FAFAFA flex:column flex:row@2xs gap:3x p:3x r:2x">
                  <div>
                    <div class="{aspect:1/1!;object:cover;w:full}_img aspect:1/1 overflow:hidden r:2x">
                      <VideoPlayerCover v-if="review.影音連結" aspect="1/1" :src="review.影音連結" />
                      <img v-else :src="review.照片[0]" alt="學員評價" />
                    </div>
                  </div>
                  <div class="b2-r text:left">
                    <p class="fg:font-title">學員 {{ review.學員 }}</p>
                    <p class="fg:font-title mt:1x">{{ review.課程名稱 }}</p>
                    <p class="mt:10x">{{ review.評價 }}</p>
                  </div>
                </div>
              </SplideSlide>
            </SplideTrack>
          </Splide>
        </ClientOnly>
      </div>

      <nuxt-link to="/review" class="block mt:10x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多學員評價</Iconify>
      </nuxt-link>
    </section>
  </div>
</template>
