# @alanlu-dev/mastercss-config

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
