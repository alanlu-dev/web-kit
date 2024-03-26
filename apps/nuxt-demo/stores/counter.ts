export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = useState('count', () => 0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    function decrement() {
      count.value--
    }

    return { count, doubleCount, increment, decrement }
  },
  {
    persist: true,
  },
)
