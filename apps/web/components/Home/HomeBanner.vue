<script setup lang="ts">
import cv from 'class-variant'
import { NuxtLink } from '#components'
import type { GallerySchemaType } from '~/schema/gallery'

const route = useRoute()
const { data: images } = await useFetch<GallerySchemaType[]>('/api/gallery/首頁-大B', { query: route.query })

// 比例
const imgRatio = {
  m: '430/270',
  pc: '1440/480',
}
const ratio = cv(
  '{object:cover;w:full}_img',
  {
    m: { '': `{aspect:${imgRatio.m}}_img aspect:${imgRatio.m}` },
    pc: { '': `{aspect:${imgRatio.pc}}_img@tablet aspect:${imgRatio.pc}@tablet` },
  },
  ({ m, pc }) => m && pc,
)
</script>

<template>
  <section>
    <div class="rel {max-w:screen-3xl;mx:auto;overflow:hidden} bg:primary/.1" :class="ratio()">
      <div class="hidden .dev_{block} {abs;top;right} bg:secondary/.8 fg:white p:1x rbl:2x z:1">
        <span class="hidden@tablet">ratio: {{ imgRatio.m }}</span>
        <span class="block@tablet hidden">ratio: {{ imgRatio.pc }}</span>
      </div>

      <ClientOnly>
        <template #fallback>
          <picture v-if="images">
            <source media="(max-width: 430px)" :srcset="images[0].圖片_M" />
            <nuxt-img :src="images[0].圖片_PC" :alt="images[0].標題" :title="images[0].標題" />
          </picture>
        </template>
        <Splide :options="{ arrows: false, autoplay: true, interval: 5000, type: 'loop' }">
          <SplideSlide v-for="image in images" :key="image.圖片_PC">
            <component :is="image.導轉連結 ? NuxtLink : 'div'" :to="image.導轉連結 || undefined" :target="image.另開視窗 ? '_blank' : '_self'" class="rel">
              <picture>
                <source media="(max-width: 430px)" :srcset="image.圖片_M" />
                <nuxt-img :src="image.圖片_PC" :alt="image.標題" :title="image.標題" />
              </picture>
            </component>
          </SplideSlide>
        </Splide>
      </ClientOnly>
    </div>
  </section>
</template>
