<script setup lang="ts">
import cv from 'class-variant'
import { Intersection } from '@splidejs/splide-extension-intersection'
import type { Options as SplideOptions } from '@splidejs/splide'
import type { InstructorSchemaType } from '~/schema/instructor'

// TODO: 設定檔
const title = ['實戰派師資陣容']
const title2 = ['精選產業優良業師', '提供高品質專業課程']

const route = useRoute()
const { data: instructors } = await useApiFetch<InstructorSchemaType[]>('/api/instructor', { query: { ...route.query, page_size: 99 } })

// 寬度公式: (fixedWidth(100%) + gap) / perPage - gap
// 第一置中位移公式: calc((100% - 元素寬度) / 2)
// 第二個置中位移公式: calc((100% - 元素寬度) / 2 - 元素寬度 - gap)
const ratio = cv(
  'mr:8px>li mr:80px>li@tablet ',
  {
    base: { '': `{w:calc((75%+8px)/1-8px)}>li translateX(calc((((100%-((75%+8px)/1-8px)))/2)-((75%+8px)/1-8px)-8px))` },
    tablet: { '': `{w:calc((65%+80px)/1-80px)}>li@tablet translateX(calc((((100%-((65%+80px)/1-80px)))/2)-((65%+80px)/1-80px)-80px))@tablet` },
    md: { '': `{w:calc((100%+80px)/2-80px)}>li@md translateX(calc((((100%-((100%+80px)/2-80px)))/2)-((100%+80px)/2-80px)-80px))@md` },
  },
  ({ base, tablet, md }) => base && tablet && md,
)

const splideOptions: SplideOptions = {
  arrows: true,
  autoplay: true,
  interval: 4000,
  type: 'loop',
  drag: 'free',
  snap: true,
  pagination: false,
  perPage: 2,
  gap: '80px',
  focus: 'center',
  breakpoints: {
    1024: {
      perPage: 1,
      fixedWidth: '65%',
    },
    430: {
      arrows: false,
      gap: '8px',
      fixedWidth: '75%',
    },
  },
  intersection: {
    inView: {
      autoplay: true,
    },
    outView: {
      autoplay: false,
    },
  },
}
</script>

<template>
  <section class="bg:home">
    <div class="{max-w:screen-max;mx:auto;overflow:hidden} py:10x text:center">
      <div class="px:6x px:10x@desktop">
        <h1 class="h1 title fg:font-title">
          <span v-for="(t, idx) in title" :key="idx">{{ t }}</span>
        </h1>
        <h3 class="h3 {flex;jc:center;flex:wrap} mt:4x">
          <span v-for="(t, idx) in title2" :key="idx" class="px:.5x">{{ t }}</span>
        </h3>
      </div>

      <div class="rel mt:5x mt:10x@tablet">
        <div class="{abs;top;bottom;left} bg:linear-gradient(to|left,home/0,home) pointer-events:none w:10vw w:30vw@desktop z:1"> </div>
        <div class="{abs;top;bottom;right} bg:linear-gradient(to|right,home/0,home) pointer-events:none w:10vw w:30vw@desktop z:1"> </div>

        <ClientOnly>
          <template #fallback>
            <div class="splide__track">
              <ul v-if="instructors?.length" class="splide__list" :class="ratio()">
                <li class="splide__slide">
                  <InstructorHomeCard :instructor="instructors[instructors.length - 1]" />
                </li>
                <li class="splide__slide">
                  <InstructorHomeCard :instructor="instructors[0]" />
                </li>
                <li class="splide__slide">
                  <InstructorHomeCard :instructor="instructors[1]" />
                </li>
              </ul>
            </div>
          </template>

          <Splide :has-track="false" :options="splideOptions" :extensions="{ Intersection }">
            <div class="splide__arrows splide__arrows--ltr {abs;center;middle} {w:80%}@tablet {w:60%;max-w:screen-md}@desktop w:90%">
              <Button intent="secondary" class="splide__arrow splide__arrow--prev left! {size:unset!;p:2x;round}! {transition:none!}:not(:hover) f:8x! f:10x!@tablet">
                <Icon class="{block;size:unset;transform:unset}! f:0.6em" name="material-symbols-light:chevron-left" />
              </Button>
              <Button intent="secondary" class="splide__arrow splide__arrow--next right! {size:unset!;p:2x;round}! {transition:none!}:not(:hover) f:8x! f:10x!@tablet">
                <Icon class="{block;size:unset;transform:unset}! f:0.6em" name="material-symbols-light:chevron-right" />
              </Button>
            </div>

            <SplideTrack>
              <SplideSlide v-for="instructor in instructors" :key="instructor.ID">
                <InstructorHomeCard :instructor="instructor" />
              </SplideSlide>
            </SplideTrack>
          </Splide>
        </ClientOnly>
      </div>

      <nuxt-link to="/instructor" class="inline-block mt:10x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多師資陣容</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
