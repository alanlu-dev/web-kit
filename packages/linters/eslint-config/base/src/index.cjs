module.exports = {
  extends: ['@antfu', '@master/css', 'plugin:prettier/recommended'],
  plugins: ['vitest'],
  rules: {
    'no-console': 'off',
    'antfu/if-newline': 'off',
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
  ignorePatterns: [
    // files
    '*Icon.vue',
    '*.{md,mdx}',
    '*.{css,scss,postcss,less}',
    // dirs
    '.github',
    'node_modules',
    '.output',
    '.nuxt',
    '.nitro',
    '.cache',
    '.virtual',
    '.turbo',
    'dist',
    'build',
    'tsx-0',
    'node-jiti',
    'coverage',
  ],
}
