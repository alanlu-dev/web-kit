# @alanlu-dev/mastercss-config

<p>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/styles/mastercss/config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/mastercss-config%2A&style=flat" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@alanlu-dev/mastercss-config"><img src="https://img.shields.io/npm/dm/@alanlu-dev/mastercss-config" alt="Downloads"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

Shareable Master CSS configuration.

## Installation

```bash
pnpm add -D @alanlu-dev/mastercss-config
```

## Usage

Create a `master.css.mjs` file in the root of your project:

```js
import config from '@alanlu-dev/mastercss-config'

/** @type {import('@master/css').Config} */
export default {
 extends: [config],
}
```
