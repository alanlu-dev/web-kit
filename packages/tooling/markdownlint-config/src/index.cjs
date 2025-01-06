const options = require('@github/markdownlint-github').init({
  // Custom overrides
  'MD013': false,
  'no-generic-link-text': false,
})

module.exports = {
  config: options,
  customRules: ['@github/markdownlint-github'],
  // outputFormatters: [
  //   ['markdownlint-cli2-formatter-pretty', { appendLink: true }], // ensures the error message includes a link to the rule documentation
  // ],
  ignores: ['node_modules/**', 'public/**', 'dist/**', 'build/**', 'node-jiti/**', '.output/**', 'coverage/**', '.changeset/**', '**/CHANGELOG.md'],
}
