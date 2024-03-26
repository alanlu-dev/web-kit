export default defineEventHandler((event) => {
  const { name } = getRouterParams(event)
  return `Hello, ${name}!`
})
