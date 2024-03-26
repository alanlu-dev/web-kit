export default defineEventHandler(async (_event) => {
  const data = await useStorage<{ text: string }>().getItem('redis:test')
  return data
})
