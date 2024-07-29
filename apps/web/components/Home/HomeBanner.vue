<script setup lang="ts">
import type { GallerySchemaType } from '~/schema/gallery'

const route = useRoute()
const { data: images } = await useFetch<GallerySchemaType[]>('/api/gallery/首頁-大B', { query: route.query })
</script>

<template>
  <section class="max-w:screen-3xl mx:auto">
    <div class="rel {aspect:1/1;object:cover;w:full}_img {aspect:1440/481}_img@tablet aspect:1/1 aspect:1440/481@tablet bg:primary/.1">
      <ClientOnly>
        <template #fallback>
          <picture v-if="images">
            <source media="(max-width: 430px)" :srcset="images[0].圖片_M" />
            <nuxt-img :src="images[0].圖片_PC" :alt="images[0].標題" :title="images[0].標題" />
          </picture>
        </template>
        <Splide :options="{ arrows: false, autoplay: true, interval: 5000, type: 'loop' }">
          <SplideSlide v-for="image in images" :key="image.圖片_PC">
            <nuxt-link :to="image.導轉連結 || undefined" class="rel">
              <picture>
                <source media="(max-width: 430px)" :srcset="image.圖片_M" />
                <nuxt-img :src="image.圖片_PC" :alt="image.標題" :title="image.標題" />
              </picture>
            </nuxt-link>
          </SplideSlide>
        </Splide>
      </ClientOnly>

      <span class="abs hidden .dev_{block} bg:secondary bottom:0 fg:white p:1x right:0 rtl:2x">
        <span class="hidden@tablet">1:1</span>
        <span class="block@tablet hidden">1440:481</span>
      </span>
    </div>
  </section>
</template>
