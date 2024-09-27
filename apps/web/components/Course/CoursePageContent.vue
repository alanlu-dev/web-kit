<script setup lang="ts">
const route = useRoute()
const router = useRouter()
// const common = useCommonStore()
const courseStore = useCourseStore()
const { data, total, length } = storeToRefs(courseStore)

// const activeBreakpoint = common.breakpoints.active()
// const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 1 : activeBreakpoint.value === 'tablet' ? 2 : 3))
const page_size = computed(() => 3)

const page = computed({
  get: () => Number.parseInt(route.params.page as string) || 1,
  set: (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  },
})

async function fetchData() {
  const params = {
    page: page.value,
    page_size: page_size.value,
    // 其他可能的查詢參數
  }
  await courseStore.fetchData(params)
  await courseStore.fetchLength()
}

await fetchData()

watch([page_size], async () => {
  await fetchData()
})
</script>

<template>
  <section class="pt:5x pt:6x@tablet px:6x px:10x@desktop" data-aos="fade-up">
    <div class="{max-w:screen-main;mx:auto}">
      <h1 class="h1 title fg:font-title">所有課程</h1>
      <p class="b1-r my:3x my:5x@desktop text:right">共 {{ length }} 堂課程</p>
      <div class="{grid-cols:1;gap:5x} {grid-cols:2}@tablet {grid-cols:3;gap:10x|5x}@sm {grid-cols:3;gap:10x|15x}@desktop">
        <CourseCard v-for="course in data" :key="course.ID" :course="course" />
      </div>
    </div>

    <Pagination class="my:10x" :page="page" :total="total" :range="1" />
  </section>
</template>
