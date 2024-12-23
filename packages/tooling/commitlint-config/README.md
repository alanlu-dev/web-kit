# @alanlu-dev/commitlint-config

<p>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/commitlint-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/commitlint-config%2A&style=flat" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@alanlu-dev/commitlint-config"><img src="https://img.shields.io/npm/dm/@alanlu-dev/commitlint-config" alt="Downloads"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

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
