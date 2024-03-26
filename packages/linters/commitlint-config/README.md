# @alanlu-dev/commitlint-config

Shareable commitlint configuration for [Conventional Commits](https://www.conventionalcommits.org).

## Installation

```bash
pnpm add -D @alanlu-dev/commitlint-config
```

## Usage

Create a `.commitlintrc.cjs` file in the root of your project:

```js
module.exports = require('@alanlu-dev/commitlint-config')
```

## Helpers

```js
const { findPackageNamesSync } = require('@alanlu-dev/commitlint-config/helpers')
```
