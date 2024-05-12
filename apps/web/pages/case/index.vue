<script setup lang="ts">
import type { CaseSchemaType } from '~/schema/case'

definePageMeta({
  title: '實績案例',
  breadcrumb: {
    label: '實績案例',
  },
})

const route = useRoute()
const { data: cases } = await useFetch<CaseSchemaType[]>('/api/case')

const page = computed(() => Number(route.query.page || 1))
const total = computed(() => (cases.value ? cases.value.length / 10 : 1))

const caseFilters = useState('caseFilters', () => ({
  category: '',
}))

const filterCases = computed(() => {
  if (caseFilters.value.category === '') return cases.value
  return cases.value?.filter((item) => item.分類 === caseFilters.value.category) || []
})
</script>

<template>
  <div>
    <Hero title="實績案例🚧" />
    <section class="px:6x px:10vw@tablet px:22.5x@desktop">
      <Breadcrumb />

      <div class="flex flex:column gap:12x mt:10x">
        <div v-for="item in filterCases" :key="item.ID" class="center-content flex gap:5x">
          <div class="{aspect:489/342;object:cover;w:full}_img aspect:489/342 flex:1">
            <img :src="item.封面" alt="課程介紹" class="pointer-events:none user-select:none" />
          </div>
          <div class="bg:#F2F9FA flex:2 p:5x|6x">
            <p>{{ item.分類 }}</p>
            <p class="h3 fg:font-title mt:2x">{{ item.標題 }}</p>
            <p class="b1-r mt:3x">{{ item.簡介 }}</p>
            <div class="text:right">
              <Button intent="primary" class="ml:auto mt:5x" @click="navigateTo(`/case/${item.ID}`)">繼續閱讀</Button>
            </div>
          </div>
        </div>
      </div>

      <Pagination :page="page" :total="total" :range="1" />
    </section>
  </div>
</template>
