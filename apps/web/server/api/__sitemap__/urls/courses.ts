import { getCoursesAsync } from '~/server/service/course/get'

export default defineSitemapEventHandler(async (event) => {
  const refresh = event.node.req.headers['x-prerender-revalidate'] === useRuntimeConfig().vercel.bypassToken

  const courses = await getCoursesAsync(null, 1, 9999, refresh, { needCourseEvents: false, needInstructor: false })
  return courses.map((course) => {
    return {
      _sitemap: 'courses',
      loc: `/course/${course.ID}`,
    }
  })
})
