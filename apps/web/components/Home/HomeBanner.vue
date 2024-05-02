<script setup lang="ts">
import type { GallerySchemaType } from '~/schema/gallery'

const { data: images } = await useFetch<GallerySchemaType[]>('/api/gallery/首頁-大B')
</script>

<template>
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
</template>
