# @alanlu-dev/utils

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
