import config from '@alanlu-dev/mastercss-config'

console.log('master-base')

/** @type {import('@master/css').Config} */
export default {
  extends: [config],
  variables: {
    'nuxt-base': '#00F',
  },
}
