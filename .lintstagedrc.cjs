module.exports = {
  '*': 'cspell --no-progress --no-must-find-files',
  '*.json': ['eslint --fix', 'prettier --write'],
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,postcss,less,html}': ['eslint --fix', 'prettier --write'],
  '*.{md,mdx}': ['markdownlint-cli2 --fix'],
}
