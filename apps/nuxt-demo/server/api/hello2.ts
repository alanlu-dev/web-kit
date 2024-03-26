export default defineEventHandler((_event) => {
  const { apiSecret } = useRuntimeConfig()

  return {
    api: apiSecret,
  }
})
