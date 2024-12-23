module.exports = {
  '*.json': ['eslint --fix', 'prettier --write'],
  '*.{js,cjs,mjs,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{vue,html}': ['eslint --fix', 'stylelint --allow-empty-input --fix', 'prettier --write'],
  '*.{css,scss,postcss,less}': ['stylelint --allow-empty-input --fix', 'prettier --write'],
  '*.{md,mdx}': ['markdownlint-cli2 --fix'],
}
