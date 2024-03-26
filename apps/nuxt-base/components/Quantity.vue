<script setup lang="ts">
interface IProps {
  qty?: number
  minQty?: number | null
  maxQty?: number | null
  alwaysOpen?: boolean
  maxMsg?: string
  initMsg?: boolean
  debounceClose?: number
  debounceDone?: number
}
const props = withDefaults(defineProps<IProps>(), {
  qty: 0,
  minQty: null,
  maxQty: null,
  alwaysOpen: false,
  initMsg: false,
  debounceClose: 1000,
  debounceDone: 300,
})

const emit = defineEmits<{
  (event: 'update:qty', qty: number): void
  (event: 'max'): void
  (event: 'min'): void
  (event: 'done'): void
}>()

const qty = computed({
  get() {
    return props.qty
  },
  set(value) {
    emit('update:qty', value)
  },
})

const isUpperLimit = computed(() => props.maxQty != null && qty.value >= props.maxQty)

const isOpen = ref<boolean>(props.alwaysOpen)
const showPopper = ref<boolean>(false)
let timer: NodeJS.Timeout
function showLimitPopper() {
  clearTimeout(timer)

  showPopper.value = true
  timer = setTimeout(() => {
    showPopper.value = false
  }, 2000)
}

function close() {
  if (!props.alwaysOpen) {
    showPopper.value = false
    isOpen.value = false
  }
}
const debounceClose = useDebounceFn(close, props.debounceClose)

function done() {
  emit('done')
}
const debounceDone = useDebounceFn(done, props.debounceDone)

function open() {
  if (!isOpen.value && !props.alwaysOpen) {
    isOpen.value = true
    if (isUpperLimit.value) {
      showLimitPopper()
    }
  }
  debounceClose()
}

function tryIncreaseQty() {
  if (props.maxQty != null && qty.value + 1 > props.maxQty) {
    showLimitPopper()
    emit('max')
  }
  else {
    emit('update:qty', qty.value + 1)
  }
  debounceClose()
  debounceDone()
}

function tryDecreaseQty() {
  if (props.minQty != null && qty.value - 1 < props.minQty) {
    emit('min')
  }
  else {
    emit('update:qty', qty.value - 1)
  }
  debounceClose()
  debounceDone()
}

onUnmounted(() => {
  done()
})
</script>

<template>
  <div tabindex="0" class="center-content flex rounded bg:white/.9 gap:4x" :class="{ show: isOpen, max: qty === maxQty }" @click="open" @onblur="done">
    <div class="quantity-minus center-content flex pointer round b:2|G-30 bg:white f:md fg:G-30 size:8x" :class="{ 'hide!': !isOpen, 'flex': isOpen }" @click="tryDecreaseQty">
      <iconify-icon icon="ic:round-minus" size="18" />
    </div>
    <div class="abs center-content flex hide:empty round .show_{rel!;fg:base-fg;bg:transparent} bg:error fg:white size:8x user-select:none z:1">
      {{ qty > 0 || (alwaysOpen && isOpen) || (isOpen && qty >= 0) ? qty : null }}
    </div>
    <VDropdown v-model:shown="showPopper" :disabled="!maxQty || qty < maxQty" :triggers="[]" auto-hide placement="top" theme="tooltip">
      <template #popper>{{ maxMsg }}</template>
      <div class="quantity-plus center-content flex pointer round .max_{bg:G-30;b:2|G-30} b:2|B-30 bg:B-30 f:md fg:white size:8x" @click="tryIncreaseQty">
        <iconify-icon icon="ic:round-plus" size="18" />
      </div>
    </VDropdown>
  </div>
</template>
