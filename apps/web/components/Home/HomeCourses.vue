<script setup lang="ts">
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event', { query: route.query })
</script>

<template>
  <section class="flex flex:column py:5x py:10x@tablet">
    <h1 class="h1 title fg:font-title">課程資訊</h1>
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
            perPage: 2.5,
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
              <Iconify icon="material-symbols-light:chevron-left" />
            </Button>
            <Button intent="secondary" class="splide__arrow splide__arrow--next rounded! {size:11.5x!;right:-5em!}@2xs p:0! right:-2.5em! size:9x">
              <Iconify icon="material-symbols-light:chevron-right" />
            </Button>
          </div>
          <SplideTrack>
            <SplideSlide v-for="event in courseEvents" :key="event.ID" class="pb:0.5x! px:0.5x">
              <div class="text:center">
                <CourseCard :event="event" />
              </div>
            </SplideSlide>
          </SplideTrack>
        </Splide>
      </ClientOnly>
    </section>

    <div class="mb:1.5x mt:7.5x text:center">
      <nuxt-link to="/course_event">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多課程</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
