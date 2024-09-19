import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { vi } from 'vitest'

vi.resetModules()

mockNuxtImport<typeof useAutoImportSetupMocked>('useAutoImportSetupMocked', () => {
  return vi.fn(() => {
    return 'mocked in setup'
  })
})

mockNuxtImport<typeof useAutoImportSetupOverridenMocked>('useAutoImportSetupOverridenMocked', () => {
  return vi.fn(() => {
    return 'mocked in setup'
  })
})
