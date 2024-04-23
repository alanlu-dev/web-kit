const { resolve } = require('node:path')

module.exports = {
  root: true,
  extends: ['@alanlu-dev/base'],
  settings: {
    '@master/css': {
      config: resolve(__dirname, 'master.css'),
    },
  },
}
