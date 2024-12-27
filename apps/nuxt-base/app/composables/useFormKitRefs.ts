import type { FormKitFrameworkContext } from '@formkit/core'

export function useFormKitRefs() {
  const form = ref<FormKitFrameworkContext>()

  const node = computed(() => form.value?.node)
  const store = computed(() => node.value?.store)
  const context = computed(() => node.value?.context)

  const state = computed(() => context.value?.state)
  const isValid = computed(() => !!state.value?.valid)
  const isDirty = computed(() => !!state.value?.dirty)
  const isComplete = computed(() => !!state.value?.complete)

  return {
    form,
    node,
    store,
    context,
    state,
    isDirty,
    isValid,
    isComplete,
  }
}
