<script setup lang="ts">
import cv from 'class-variant'
import type { ReviewSchemaType } from '~/schema/review'

// TODO: 設定檔
const title = ['學員滿意度 93.8%']
const title2 = ['致力營造優質的學習環境,', '持續精進教學,為學員提供更好的學習體驗']

const route = useRoute()
const { data: reviews } = await useFetch<ReviewSchemaType[]>('/api/review', { query: { ...route.query, page_size: 10 } })

// 寬度公式: (fixedWidth(100%) + gap) / perPage - gap
const ratio = cv(
  'mr:20px>li mr:40px>li@md ',
  {
    base: { '': `{w:calc((100%+20px)/1-20px)}>li` },
    tablet: { '': `{w:calc((100%+20px)/2-20px)}>li@tablet` },
    md: { '': `{w:calc((100%+40px)/2-40px)}>li@md` },
  },
  ({ base, tablet, md }) => base && tablet && md,
)

const splideOption = {
  arrows: true,
  type: 'loop',
  drag: 'free',
  snap: true,
  pagination: false,
  perPage: 2,
  gap: '40px',
  breakpoints: {
    1024: {
      gap: '20px',
    },
    430: {
      perPage: 1,
    },
  },
}
</script>

<template>
  <section>
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} p:10x|6x px:10x@desktop text:center">
      <div>
        <h1 class="h1 title fg:font-title">
          <span v-for="(t, idx) in title" :key="idx">{{ t }}</span>
        </h1>
        <h3 class="h3 {flex;jc:center;flex:wrap} mt:4x">
          <span v-for="(t, idx) in title2" :key="idx" class="px:.5x">{{ t }}</span>
        </h3>
      </div>

      <div class="{max-w:screen-main;mx:auto} mt:5x mt:10x@tablet w:80% w:full@desktop">
        <ClientOnly>
          <template #fallback>
            <div class="splide__track">
              <ul v-if="reviews?.length" class="splide__list" :class="ratio()">
                <li class="splide__slide">
                  <ReviewCardHome :review="reviews[0]" />
                </li>
                <li class="splide__slide">
                  <ReviewCardHome :review="reviews[1]" />
                </li>
              </ul>
            </div>
          </template>

          <Splide :has-track="false" :options="splideOption">
            <div class="splide__arrows splide__arrows--ltr {abs;center;middle} {left:-20x;right:-20x;max-w:calc(100vw-10x)}!">
              <Button intent="secondary" class="splide__arrow splide__arrow--prev left! {size:unset!;p:2x;round}! {transition:none!}:not(:hover) f:8x! f:10x!@tablet">
                <Icon class="f:0.6em {block;size:unset;transform:unset}!" name="material-symbols-light:chevron-left" />
              </Button>
              <Button intent="secondary" class="splide__arrow splide__arrow--next right! {size:unset!;p:2x;round}! {transition:none!}:not(:hover) f:8x! f:10x!@tablet">
                <Icon class="f:0.6em {block;size:unset;transform:unset}!" name="material-symbols-light:chevron-right" />
              </Button>
            </div>

            <SplideTrack>
              <SplideSlide v-for="review in reviews" :key="review.ID">
                <ReviewCardHome :review="review" />
              </SplideSlide>
            </SplideTrack>
          </Splide>
        </ClientOnly>
      </div>

      <nuxt-link to="/review" class="inline-block mt:10x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多學員評價</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
