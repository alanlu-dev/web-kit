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

const query = ref(route.query)
watch(
  () => route.query,
  (val) => {
    query.value = val
  },
)

// TODO: 過濾之後的分頁

const { data: cases } = await useFetch<CaseSchemaType[]>('/api/case', { query })
const { data: length } = await useFetch<number>('/api/case/length', { query })

const page = computed(() => Number(route.query.page || 1))
const total = computed(() => (length.value ? Math.ceil(length.value / 10) : 1))

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
    <Breadcrumb />

    <section>
      <div class="flex ai:flex-start flex:column flex:row@tablet gap:5x gap:16x@tablet gap:32.5x@desktop jc:space-between mt:10x">
        <nav aria-label="Filters" class="b1-r sticky h:full top:59! top:76!@tablet top:82!@desktop z:nav">
          <div class="block@tablet hidden">
            <ul
              class="flex {p:1x|7.5x;cursor:pointer;nowrap;rel}_li {content:'';abs;top;left;bottom;w:2x;~background|300ms|ease}_li::before {bg:primary}_li[active=true]::before {content:'';abs;top;left;bottom;w:2x;bg:home}::before {fg:primary}_li:hover,_li[active=true] flex:column gap:3x"
            >
              <li v-for="filter in filterOptions" :key="filter.value" :active="caseFilters.category === filter.value" @click="caseFilters.category = filter.value">
                {{ filter.label }}
              </li>
            </ul>
          </div>
          <div class="hidden@tablet bg:base-bg mt:-3x px:2x w:full">
            <Splide :options="{ drag: 'free', arrows: false, pagination: false, autoWidth: true, gap: 0 }">
              <SplideSlide v-for="filter in filterOptions" :key="filter.value">
                <p class="{fg:primary}[active=true] cursor:pointer p:3x|4x" :active="caseFilters.category === filter.value" @click="caseFilters.category = filter.value">
                  {{ filter.label }}
                </p>
              </SplideSlide>
            </Splide>
          </div>
        </nav>

        <div class="flex ai:stretch flex:column gap:15x overflow:hidden px:6x px:0@tablet">
          <CaseCard v-for="item in filterCases" :key="item.ID" :item="item" />
        </div>
      </div>

      <Pagination :page="page" :total="total" :range="1" />
    </section>
  </div>
</template>
