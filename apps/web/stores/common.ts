import { useBreakpoints } from '@vueuse/core'
import breakpointsValue from '@jiehousekeeper/master-css-config/breakpoints'

export const useCommonStore = defineStore('common', () => {
  const breakpoints = useBreakpoints(breakpointsValue)

  return { breakpoints }
})
