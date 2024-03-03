const antfu = require('@antfu/eslint-config').default
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat()

// Check out the configs and factory for more details.
// configs: https://github.com/antfu/eslint-config/tree/main/src/configs
// factory: https://github.com/antfu/eslint-config/blob/main/src/factory.ts

module.exports = antfu(
  // Legacy config
  ...compat.config({
    extends: ['plugin:prettier/recommended'],

    plugins: ['markdown', 'mdx'],
    rules: {
      'no-console': 'off',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    overrides: [
      {
        // Enable the Markdown processor for all .md files.
        files: ['*.md'],
        processor: 'markdown/markdown',
      },
      {
        // Optionally, customize the configuration ESLint uses for ```js
        // fenced code blocks inside .md files.
        files: ['**/*.md/*.js', '**/*.md/*.ts'],
        rules: {
          '@stylistic/js/no-multi-spaces': 'off',
        },
      },
      // 添加 MDX 支持
      {
        files: ['*.mdx'], // 目標 MDX 檔案
        extends: ['plugin:mdx/recommended'],
      },
      {
        files: ['**/*.mdx/*.js', '**/*.mdx/*.ts'],
        rules: {
          // 這裡可以根據需要定制 MDX 中的 JS/TS 代碼塊的 lint 規則
        },
      },
    ],
  }),

  // Other flat configs...
)
