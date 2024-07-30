<script setup lang="ts">
import type { InstructorSchemaType } from '~/schema/instructor'

const route = useRoute()
const { data: instructors } = await useFetch<InstructorSchemaType[]>('/api/instructor', { query: { ...route.query, page_size: 99 } })
</script>

<template>
  <div class="rel bg:home">
    <section class="max-w:screen-max mx:auto py:10x text:center">
      <div class="px:1x">
        <h1 class="h1 title fg:font-title">實戰派師資陣容</h1>
        <h3 class="h3 mt:4x">精選產業優良業師 提供高品質專業課程</h3>
      </div>

      <div class="rel mt:5x mt:10x@tablet">
        <ClientOnly>
          <template #fallback>
            <div class="text:center"> loading </div>
          </template>

          <div class="abs bg:linear-gradient(to|left,home/0,home) bottom:0 left:0 pointer-events:none top:0 w:10vw w:30vw@desktop z:1"> </div>
          <div class="abs bg:linear-gradient(to|right,home/0,home) bottom:0 pointer-events:none right:0 top:0 w:10vw w:30vw@desktop z:1"> </div>

          <Splide
            :has-track="false"
            :options="{
              arrows: true,
              type: 'loop',
              snap: true,
              pagination: false,
              perPage: 2,
              gap: '80px',
              focus: 'center',
              breakpoints: {
                1024: {
                  perPage: 1.5,
                },
                430: {
                  perPage: 1.3,
                  gap: '8px',
                },
              },
            }"
          >
            <div class="splide__arrows splide__arrows--ltr abs middle w:full">
              <div class="rel h:full max-w:screen-lg mx:auto w:95% w:70%@xs">
                <Button intent="secondary" class="splide__arrow splide__arrow--prev round! {f:6.75x;size:6.75x}! {f:9x;size:9x}!@tablet {f:10x;size:10x}!@desktop p:0!">
                  <Iconify class="flex! {f:.6em;transform:unset}!>svg" icon="material-symbols-light:chevron-left" />
                </Button>
                <Button intent="secondary" class="splide__arrow splide__arrow--next round! {f:6.75x;size:6.75x}! {f:9x;size:9x}!@tablet {f:10x;size:10x}!@desktop p:0!">
                  <Iconify class="flex! {f:.6em;transform:unset}!>svg" icon="material-symbols-light:chevron-right" />
                </Button>
              </div>
            </div>
            <SplideTrack>
              <SplideSlide v-for="instructor in instructors" :key="instructor.ID">
                <InstructorCard :instructor="instructor" />
              </SplideSlide>
            </SplideTrack>
          </Splide>
        </ClientOnly>
      </div>

      <nuxt-link to="/instructor" class="block mt:10x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多師資陣容</Iconify>
      </nuxt-link>
    </section>
  </div>
</template>
