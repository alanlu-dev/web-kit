import { getAll } from '@vercel/edge-config'

export default defineEventHandler(async (_event) => {
  return getAll()
})
