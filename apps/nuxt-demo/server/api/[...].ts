export default defineEventHandler((event) => {
  return {
    ok: true,
    data: {
      url: event.node.req.url,
    },
    message: '/api 下不匹配的路由都會進入這裡',
  }
})
