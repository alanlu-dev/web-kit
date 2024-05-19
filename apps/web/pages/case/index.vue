<script setup lang="ts">
import type { CaseSchemaType } from '~/schema/case'

definePageMeta({
  title: '實績案例',
  breadcrumb: {
    label: '實績案例',
  },
})

useSeoMeta({
  title: '實績案例',
})

const route = useRoute()
const { data: cases } = await useFetch<CaseSchemaType[]>('/api/case')

const page = computed(() => Number(route.query.page || 1))
const total = computed(() => (cases.value ? cases.value.length / 10 : 1))

const caseFilters = useState('caseFilters', () => ({
  category: '',
}))

const filterOptions = [
  { value: '', label: '所有案例' },
  { value: '課堂實作', label: '課堂實作' },
  { value: '樣品實作', label: '樣品實作' },
  { value: '學生成品', label: '學生成品' },
]

const filterCases = computed(() => {
  if (caseFilters.value.category === '') return cases.value
  return cases.value?.filter((item) => item.分類 === caseFilters.value.category) || []
})
</script>

<template>
  <div>
    <Hero title="實績案例" />
    <section class="px:10vw@tablet px:22.5x@desktop">
      <Breadcrumb />

      <div class="flex ai:flex-start jc:space-between flex:column flex:row@tablet gap:5x gap:16x@tablet gap:32.5x@desktop mt:10x">
        <nav aria-label="Filters" class="sticky z:nav h:full top:59! top:76!@tablet top:82!@desktop b1-r">
          <div class="hidden block@tablet">
            <ul
              class="flex flex:column gap:3x {content:'';abs;top;left;bottom;w:2x;bg:#F2F9FA}::before {content:'';abs;top;left;bottom;w:2x;~background|300ms|ease}_li::before {bg:primary}_li[active=true]::before {p:1x|7.5x;cursor:pointer;nowrap;rel}_li {fg:primary}_li:hover,_li[active=true]"
            >
              <li v-for="filter in filterOptions" :key="filter.value" :active="caseFilters.category === filter.value" @click="caseFilters.category = filter.value">
                {{ filter.label }}
              </li>
            </ul>
          </div>
          <div class="hidden@tablet w:full bg:base-bg mt:-3x px:2x">
            <Splide :options="{ drag: 'free', arrows: false, pagination: false, autoWidth: true, gap: 0 }">
              <SplideSlide v-for="filter in filterOptions" :key="filter.value">
                <p class="p:3x|4x cursor:pointer {fg:primary}[active=true]" @click="caseFilters.category = filter.value" :active="caseFilters.category === filter.value">
                  {{ filter.label }}
                </p>
              </SplideSlide>
            </Splide>
          </div>
        </nav>

        <div class="flex flex:column ai:stretch gap:15x px:6x px:0@tablet overflow:hidden">
          <CaseCard v-for="item in filterCases" :key="item.ID" :item="item" />
        </div>
      </div>

      <Pagination :page="page" :total="total" :range="1" />
    </section>
  </div>
</template>
