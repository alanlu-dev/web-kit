# @alanlu-dev/utils

<p>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/utils/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/utils%2A&style=flat" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@alanlu-dev/utils"><img src="https://img.shields.io/npm/dm/@alanlu-dev/utils" alt="Downloads"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

A collection of utility functions.

## Installation

```bash
pnpm add @alanlu-dev/utils
```

## API

### obj

```js
import { arrayToObject, getDefaultFromProps, getErrorMessage, getPropsFromObjectWithFilter, normalizeOptions, obj2QueryString, queryString2Obj, setCallback } from '@alanlu-dev/utils/obj'
```

### string

```js
import { formatThousand, replaceImgTagIfSrcContains, replaceRelativePathsWithAbsolute } from '@alanlu-dev/utils/string'
```

### time

```js
import { formatCountdown, getBusinessStatus } from '@alanlu-dev/utils/time'
```

### validator

```js
import { isGuiNumberValid } from '@alanlu-dev/utils/validator'

isGuiNumberValid('12345675') // true
isGuiNumberValid('12345676') // false
```
