# @alanlu-dev/mastercss-helpers

<p>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/styles/mastercss/helpers/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/mastercss-helpers%2A&style=flat" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@alanlu-dev/mastercss-helpers"><img src="https://img.shields.io/npm/dm/@alanlu-dev/mastercss-helpers" alt="Downloads"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

A collection of utility functions for Master CSS.

## Installation

```bash
pnpm add -D @alanlu-dev/mastercss-helpers
```

## Usage

* `cls` - 一個函數，它接受"strings"數組和"tokens"作為參數並返回一個字符串。

  ```js
  import { cls } from '@alanlu-dev/mastercss-helpers'
  ```

* `group` - 根據提供的配置生成 CSS 組字符串。

  ```js
  import { group } from '@alanlu-dev/mastercss-helpers'
  ```

* `toLine` - Generates a line of styles based on the given object and options.

  ```js
  import { toLine } from '@alanlu-dev/mastercss-helpers'
  ```
