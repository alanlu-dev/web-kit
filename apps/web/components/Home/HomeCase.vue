<script setup lang="ts">
import CaseCard from '../Case/CaseCard.vue'
import type { CaseSchemaType } from '~/schema/case'

const { data: cases } = await useFetch<CaseSchemaType[]>('/api/case')
</script>

<template>
  <section class="flex bg:#F2F9FA flex:column py:5x py:10x@tablet">
    <h1 class="h1 title">實績案例</h1>
    <section class="rel {mt:10x}@tablet mt:5x mx:15vw">
      <ClientOnly>
        <template #fallback>
          <div class="text:center"> loading </div>
        </template>
        <Splide
          :has-track="false"
          :options="{
            arrows: true,
            type: 'loop',
            gap: '2rem',
            snap: true,
            pagination: false,
            breakpoints: {
              430: { arrows: false },
            },
          }"
        >
          <div class="splide__arrows splide__arrows--ltr">
            <Button intent="secondary" class="splide__arrow splide__arrow--prev rounded! {size:11.5x!;left:-5em!}@2xs left:-2.5em! p:0! size:9x">
              <Iconfiy icon="material-symbols-light:chevron-left" />
            </Button>
            <Button intent="secondary" class="splide__arrow splide__arrow--next rounded! {size:11.5x!;right:-5em!}@2xs p:0! right:-2.5em! size:9x">
              <Iconfiy icon="material-symbols-light:chevron-right" />
            </Button>
          </div>
          <SplideTrack>
            <SplideSlide v-for="item in cases" :key="item.ID">
              <CaseCard :item="item" type="home" class="mx:5x@tablet mx:10x@desktop" />
            </SplideSlide>
          </SplideTrack>
        </Splide>
      </ClientOnly>
    </section>

    <!-- <div class="mb:1.5x mt:7.5x text:center">
      <nuxt-link to="/case">
        <Iconfiy icon="material-symbols-light:arrow-right-alt">更多案例</Iconfiy>
      </nuxt-link>
    </div> -->
  </section>
</template>
