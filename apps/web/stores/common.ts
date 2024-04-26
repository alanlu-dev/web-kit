import { useBreakpoints, useWindowScroll } from '@vueuse/core'
import breakpointsValue from '@jiehousekeeper/master-css-config/breakpoints'

export const useCommonStore = defineStore('common', () => {
  const breakpoints = useBreakpoints(breakpointsValue)

  const { y: scrollY } = useWindowScroll({ behavior: 'smooth' })

  return { breakpoints, scrollY }
})
