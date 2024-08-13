<script setup lang="ts">
import cv from 'class-variant'
import type { CourseSchemaType } from '~/schema/course'

definePageMeta({
  title: '課程資訊',
  breadcrumb: {
    label: '課程資訊',
  },
})

const route = useRoute()
const router = useRouter()

const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()

const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 5 : activeBreakpoint.value === 'tablet' ? 6 : 9))

interface QueryType {
  page?: number
  page_size: number
}
const query = ref<QueryType>({ ...route.query, page_size: page_size.value })
watch(
  () => route.query,
  (val) => {
    query.value = { ...val, page_size: page_size.value }
  },
)

const { data: courses } = await useApiFetch<CourseSchemaType[]>('/api/course', { query })
const { data: length } = await useApiFetch<number>('/api/course/length', { query })

const total = computed(() => (length.value ? Math.ceil(length.value / page_size.value) : 1))
const page = computed(() => {
  const currentPage = Number(route.query.page || 1)
  return currentPage > total.value ? total.value : currentPage
})

watch(
  () => page.value,
  (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  },
)

const data = [
  { icon: 'hugeicons:money-bag-02', title: ['想開啟斜槓人生,', '創造自己的多元收入之路!'] },
  { icon: 'fluent:prompt-16-regular', title: ['想精進自己的專業技能,', '晉升家事職人!'] },
  { icon: 'material-symbols-light:mop-outline', title: ['想學習高效技巧,', '為自己愛家維持居家整潔!'] },
  { icon: 'clarity:tools-line', title: ['想轉換跑道、二度就業,', '尋找新的職涯方向'] },
]

const data2 = [
  { img: '/course/step1.jpg', h1: '課堂上課', h2: '教室講解建材特性' },
  { img: '/course/step2.jpg', h1: '樣品實作', h2: '前往真實教室清潔練習' },
  { img: '/course/step3.jpg', h1: '實際演練', h2: '至客戶案場，老師陪同作業' },
]

// 寬度公式: (fixedWidth(100%) + gap) / perPage - gap
const ratio = cv(
  'mr:80px>li mr:100px>li@md ',
  {
    base: { '': `{w:60%}>li` },
    xs: { '': `{w:calc((100%+80px)/3-80px)}>li@xs` },
    md: { '': `{w:calc((100%+100px)/3-100px)}>li@md` },
  },
  ({ base, xs, md }) => base && xs && md,
)

const splideOption = {
  arrows: false,
  pagination: false,
  drag: 'free',
  gap: '100px',
  snap: true,
  perPage: 3,
  breakpoints: {
    1024: {
      gap: '80px',
    },
    768: {
      perPage: 1,
      fixedWidth: '60%',
    },
  },
}
</script>

<template>
  <div>
    <Hero title="課程資訊" />
    <Breadcrumb />

    <section class="{max-w:screen-max;mx:auto} px:6x px:10x@tablet" data-aos="fade-up">
      <div class="{flex;flex:col;center-content;gap:3x;py:5x} {gap:5x;py:10x}@tablet {flex:row;gap:15x}@desktop">
        <h2 class="h2 title {flex;flex:col} fg:font-title">
          <span>不限入行門檻,</span>
          <span>滿足不同階段學習需求</span>
        </h2>
        <div class="{grid-cols:2;gap:5x}">
          <div v-for="(i, idx) in data" :key="`${i.icon}-${idx}`" class="{flex;flex:col;jc:flex-start;gap:1x} {flex:row;gap:3x}@tablet bg:#FAFAFA p:6x|3x r:2x">
            <Icon class="f:8x f:16x@tablet" :name="i.icon" />
            <p class="b2-r {flex;flex:col}">
              <span v-for="(p, pIdx) in i.title" :key="`${i.icon}-p-${pIdx}`">{{ p }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section data-aos="fade-up" data-aos-delay="200" class="bg:home p:15x|6x px:10x@desktop text:center">
      <h2 class="h2 {flex;flex:col;center-content} {flex:row}@desktop fg:font-title">
        <span>獨家課程安排三步驟,</span>
        <span>不藏私教學助你快速出班</span>
      </h2>
      <div class="rel {max-w:screen-main;mx:auto} mt:6x mt:10x@tablet">
        <div class="hidden@md {abs;top;bottom;right:0} bg:linear-gradient(to|right,home/0,home) pointer-events:none w:4x z:1"> </div>

        <ClientOnly>
          <template #fallback>
            <div class="splide__track">
              <ul v-if="data2?.length" class="splide__list" :class="ratio()">
                <li class="splide__slide">
                  <CourseStep :item="data2[0]" />
                </li>
                <li class="splide__slide">
                  <CourseStep :item="data2[1]" />
                </li>
                <li class="splide__slide">
                  <CourseStep :item="data2[2]" />
                </li>
              </ul>
            </div>
          </template>

          <Splide :options="splideOption">
            <SplideSlide v-for="(i, idx) in data2" :key="i.h1" class="{flex;flex:col;center-content} text:center">
              <CourseStep :item="i" :last="idx === data2.length - 1" />
            </SplideSlide>
          </Splide>
        </ClientOnly>
      </div>
    </section>

    <section class="pt:5x pt:6x@tablet px:6x px:10x@desktop" data-aos="fade-up">
      <div class="{max-w:screen-main;mx:auto}">
        <h1 class="h1 title fg:font-title">所有課程</h1>
        <p class="b1-r my:3x my:5x@desktop text:right">共 {{ courses?.length }} 堂課程</p>
        <div class="{grid-cols:1;gap:5x} {grid-cols:2}@tablet {grid-cols:3;gap:10x|5x}@sm {grid-cols:3;gap:10x|15x}@desktop">
          <CourseCard v-for="course in courses" :key="course.ID" :course="course" />
        </div>
      </div>

      <Pagination class="my:10x" :page="page" :total="total" :range="1" />
    </section>
  </div>
</template>
