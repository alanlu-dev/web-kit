/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue', 'stylelint-config-recess-order'],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.(scss|css|html|vue)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'no-empty-source': null,
    // 允許 global、export、v-deep 等偽類
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep'] }],
    /** selector class pattern must match [BEM CSS](https://en.bem.info/methodology/css) - [Regex](https://regexr.com/3apms) */
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`
        },
      },
    ],
  },
}
