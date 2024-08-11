import type { OrderParamsSchemaType } from '~/schema/order'

export default defineEventHandler<{
  body: OrderParamsSchemaType
}>(async (event) => {
  const data = await readBody(event)
  try {
    const result = await processOrder(data)
    if (result.rc !== 200) {
      return result
    }

    return {
      rc: 200,
      data: result.data!,
    }
  }
  catch (error) {
    return error
  }
})
