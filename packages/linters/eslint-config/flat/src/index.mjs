import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import css from '@master/eslint-config-css/flat'

import vitest from 'eslint-plugin-vitest'

const compat = new FlatCompat()

export default antfu(
  {
    markdown: false,
    rules: {
      'antfu/if-newline': 'off',
      'style/arrow-parens': 'off',
      'style/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none', // 'none' or 'semi' or 'comma'
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi', // 'semi' or 'comma'
            requireLast: false,
          },
        },
      ],
    },
    ignores: [
      // files
      '**/*.{md,mdx}',
      '**/*.{css,scss,postcss,less}',
      // dirs
      '**/.github',
      '**/node_modules',
      '**/.output',
      '**/.nuxt',
      '**/.nitro',
      '**/.cache',
      '**/.virtual',
      '**/.turbo',
      '**/dist',
      '**/build',
      '**/tsx-0',
      '**/node-jiti',
      '**/coverage',
    ],
  },

  // Vitest
  {
    files: ['tests/**', '*.test.{js,ts,mjs,cjs}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      // 'vitest/max-nested-describe': ['error', { max: 3 }], // you can also modify rules' behavior using option like this
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },

  // Master CSS
  {
    ...css,
    ignores: ['**/components/global/**Icon.vue'],
  },

  // Legacy config
  ...compat.config({
    extends: ['plugin:prettier/recommended'],

    rules: {
      'no-console': 'off',
      'n/prefer-global/process': 'off',
    },

    overrides: [
      {
        // 針對 locales 目錄下的所有 .json 檔案
        files: ['locales/**/*.json'],
        rules: {
          // 關閉 max-len 規則
          'max-len': 'off',
        },
      },
    ],
  }),

  // Other flat configs...
)
