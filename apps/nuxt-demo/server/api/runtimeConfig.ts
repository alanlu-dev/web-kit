export default defineEventHandler((_event) => {
  const config = useRuntimeConfig()
  return config
})
