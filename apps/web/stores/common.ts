import breakpointsValue from '@jiehousekeeper/master-css-config/breakpoints'
import { useBreakpoints, useWindowScroll } from '@vueuse/core'

export const useCommonStore = defineStore('common', () => {
  const breakpoints = useBreakpoints(breakpointsValue)

  const { y: scrollY } = useWindowScroll({ behavior: 'smooth' })

  return { breakpoints, scrollY }
})
