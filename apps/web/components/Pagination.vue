<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    page: number
    total: number
    range: number
  }>(),
  {
    page: 1,
    total: 1,
    range: 1,
  },
)
const route = useRoute()
// const router = useRouter()

const currentPage = computed(() => Math.max(1, Math.min(props.page, props.total)))
const totalPage = computed(() => Math.max(1, props.total))

const threshold = computed(() => props.range * 2 + 1)

// 根據起始和結束頁碼生成頁碼陣列
function generatePages(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString())
}

const displayPages = computed(() => {
  const pages: string[] = []
  const total = totalPage.value
  const current = currentPage.value
  const range = props.range

  if (total <= threshold.value + 4) {
    for (let i = 1; i <= total; i++) {
      pages.push(i.toString())
    }
  }
  else {
    // 頭部和尾部固定顯示
    pages.push('1')
    pages.push(total.toString())

    // 根據當前頁碼決定中間部分如何顯示
    if (current < range + 4) {
      const start = 2
      const end = start + threshold.value
      pages.splice(1, 0, ...generatePages(start, end), '…')
    }
    else if (current < total - range - 2) {
      const start = current - range
      const end = current + range
      pages.splice(1, 0, '…', ...generatePages(start, end), '…')
    }
    else {
      const end = total - 1
      const start = end - threshold.value
      pages.splice(1, 0, '…', ...generatePages(start, end))
    }
  }

  return pages
})

// 如果包含 -page-page

const routeName = computed(() => {
  const name = route.name as string
  if (name.includes('-page-page')) return name
  return `${name}-page-page`
})

const siteConfig = useSiteConfig()
const root = computed(() => route.fullPath.split('/')[1])
const canonicalUrl = computed(() => {
  return currentPage.value === 1 ? `${siteConfig.url}/${root.value}` : `${siteConfig.url}/${root.value}/page/${currentPage.value}`
})

useHead({
  title: `${route.meta.title} ${currentPage.value > 1 ? `- 第 ${currentPage.value} 頁` : ''}`,
  link: [
    { rel: 'canonical', href: canonicalUrl },
    currentPage.value > 1 ? { rel: 'prev', href: `${siteConfig.url}/${root.value}/page/${currentPage.value - 1}` } : {},
    currentPage.value < totalPage.value ? { rel: 'next', href: `${siteConfig.url}/${root.value}/page/${currentPage.value + 1}` } : {},
  ].filter(Boolean),
})

function jumpPages(page: number | string) {
  if (currentPage.value === +page) return

  let newPage

  if (page === 'forward') {
    newPage = Math.min(currentPage.value + threshold.value, totalPage.value)
  }
  else if (page === 'backward') {
    newPage = Math.max(currentPage.value - threshold.value, 1)
  }
  else {
    newPage = Number(page)
  }

  if (newPage >= 1 && newPage <= totalPage.value) {
    // navigateTo({ name: route.name as string, query: { page: newPage } })
    // 使用路由導航而不是查詢參數
    navigateTo({ name: routeName.value, params: { page: newPage } })
  }
}
</script>

<template>
  <div class="{flex;center-content;gap:2x} {gap:3x}@tablet {gap:5x}@desktop {size:6x;f:14;p:0;rounded;fg:font-title;font:regular}>button {size:7x;f:16}>button@tablet {size:8x}>button@desktop">
    <Button intent="text" class="{flex!;center-content}" :disabled="currentPage === 1" @click="jumpPages(currentPage - 1)">
      <Iconify icon="material-symbols-light:chevron-left" />
    </Button>
    <Button
      v-for="(targetPage, index) in displayPages"
      :key="index"
      :intent="currentPage.toString() === targetPage ? 'primary' : 'text'"
      @click="jumpPages(targetPage === '…' ? (index === 1 ? 'backward' : 'forward') : targetPage)"
    >
      {{ targetPage }}
    </Button>
    <Button intent="text" class="{flex!;center-content}" :disabled="currentPage === totalPage" @click="jumpPages(currentPage + 1)">
      <Iconify icon="material-symbols-light:chevron-right" />
    </Button>
  </div>
</template>
