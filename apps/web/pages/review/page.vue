<script setup lang="ts">
const route = useRoute()
const page = computed(() => Number.parseInt(route.params.page as string) || 1)
</script>

<template>
  <div>
    <Hero title="學員評價" />
    <Breadcrumb :title="`第${page}頁`" :is-page-root="true" />

    <section class="rel overflow:hidden" data-aos="fade-up">
      <div class="{content:'';abs;inset:0;bg:home/.8}::before bg:cover bg:url(/review/cover2.jpg)|no-repeat|center|45% blur(1px) h:40x h:50x@tablet h:60x@desktop"> </div>
      <div class="{abs;center;middle} {flex;center-content} p:5x|7x">
        <div class="font:bold ls:0.1em">
          <h1 class="f:5x f:6.5x@tablet f:8x@desktop">模擬真實案場,手把手教學,學習效率更高!</h1>
          <h2 class="f:4x f:5.5x@tablet f:7x@desktop">超過 <span class="fg:accent">500+</span> 則真實評價,上過課的學員們這麼說:</h2>
        </div>
      </div>
    </section>
    <NuxtPage />
  </div>
</template>
