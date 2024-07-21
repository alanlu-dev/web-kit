<script setup lang="ts">
import type { GallerySchemaType } from '~/schema/gallery'

const route = useRoute()
const { data: images } = await useFetch<GallerySchemaType[]>('/api/gallery/首頁-大B', { query: route.query })
</script>

<template>
  <section class="max-w:screen-3xl mx:auto">
    <div class="rel {aspect:1440/481;object:cover;w:full}_img aspect:1440/481 bg:primary/.1">
      <ClientOnly>
        <template #fallback>
          <img v-if="images" :src="images[0].圖片" :alt="images[0].標題" :title="images[0].標題" />
        </template>
        <Splide :options="{ arrows: false, autoplay: true, interval: 5000, type: 'loop' }">
          <SplideSlide v-for="image in images" :key="image.圖片">
            <nuxt-link :to="image.導轉連結 || undefined" class="rel">
              <img :src="image.圖片" :alt="image.標題" :title="image.標題" />
            </nuxt-link>
          </SplideSlide>
        </Splide>
      </ClientOnly>
      <span class="abs hidden .dev_{block} bg:secondary bottom:0 fg:white p:1x right:0 rtl:2x">1440:481</span>
    </div>
  </section>
</template>
