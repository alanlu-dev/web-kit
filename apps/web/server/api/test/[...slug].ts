import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get(
  '/hello',
  defineEventHandler(() => 'Hello World'),
)

export default useBase('/api/test', router.handler)
