import { getCoursesAsync } from '~/server/service/course/get'

export default defineSitemapEventHandler(async () => {
  const courses = await getCoursesAsync(null, 1, 9999, false, { needCourseEvents: false, needInstructor: false })
  return courses.map((course) => {
    return {
      _sitemap: 'courses',
      loc: `/course/${course.ID}`,
    }
  })
})
