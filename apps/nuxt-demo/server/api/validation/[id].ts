export default defineEventHandler((event) => {
  const id = Number.parseInt(event.context.params?.id || '', 10)
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    })
  }

  // setResponseStatus(event, 202)

  return 'All good'
})
