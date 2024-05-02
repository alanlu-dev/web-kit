<script setup lang="ts">
const courses = [
  { id: 1, title: '初級家事清潔課程', price: 'NT$3,200', tag: '1', place: '台中潔管家教室', date: '2024/06/01～2024/06/30', image: '/course1.png' },
  { id: 2, title: '進階家事清潔課程', price: 'NT$3,200', tag: '2', place: '台中潔管家教室', date: '2024/06/01～2024/06/30', image: '/course1.png' },
  { id: 3, title: '初級家事清潔課程', price: 'NT$3,200', tag: '1', place: '台中潔管家教室', date: '2024/06/01～2024/06/30', image: '/course1.png' },
]
</script>

<template>
  <section class="flex flex:column py:5x py:10x@tablet">
    <h1 class="h1 title">課程資訊</h1>
    <section class="rel {my:10x}@tablet m:5x|15vw">
      <ClientOnly>
        <template #fallback>
          <div class="text:center"> loading </div>
        </template>
        <Splide
          :has-track="false"
          :options="{
            arrows: true,
            type: 'loop',
            perPage: 3,
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
              <Icon icon="material-symbols-light:chevron-left" />
            </Button>
            <Button intent="secondary" class="splide__arrow splide__arrow--next rounded! {size:11.5x!;right:-5em!}@2xs p:0! right:-2.5em! size:9x">
              <Icon icon="material-symbols-light:chevron-right" />
            </Button>
          </div>
          <SplideTrack>
            <SplideSlide v-for="course in courses" :key="course.id" class="pb:0.5x! px:0.5x">
              <div class="text:center">
                <div class="center-content inline-flex flex:wrap gap:12x|11x mx:auto">
                  <nuxt-link class="bg:base-bg overflow:hidden r:2x scale(1.1):hover_img shadow:md" :to="`/course/${course.id}`">
                    <div class="rel aspect:316/133 overflow:hidden">
                      <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="course.image" :alt="course.title" />
                    </div>
                    <div class="p:2x|4x">
                      <div class="flex ai:center gap:2x jc:flex-start">
                        <Level :level="course.tag" />
                        <p class="b1-b fg:font-title">{{ course.title }}</p>
                      </div>
                      <div class="flex ai:center jc:flex-start mt:2x">
                        <p class="nowrap">上課日期：</p>
                        <p>{{ course.date }}</p>
                      </div>
                      <div class="flex ai:center jc:flex-start mt:2x">
                        <p class="nowrap">上課地點：</p>
                        <p>{{ course.place }}</p>
                      </div>
                      <hr class="bg:#DBD9D9 h:1 mt:9x" />
                      <p class="h3 fg:accent! mt:2x text:right">{{ course.price }}</p>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </SplideSlide>
          </SplideTrack>
        </Splide>
      </ClientOnly>
    </section>

    <div class="{mt:7.5x}@tablet mb:1.5x mt:6x text:center">
      <nuxt-link to="/course">
        <Icon icon="material-symbols-light:arrow-right-alt">更多課程</Icon>
      </nuxt-link>
    </div>
  </section>
</template>
