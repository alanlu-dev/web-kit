import { merge } from 'ts-deepmerge'

// Base
import base from './base/_index.mjs'

// Layouts
import layouts from './layouts/_index.mjs'

// Components
import components from './components/_index.mjs'

/** @type {import('@master/css').Config} */
export default {
  ...merge(
    // Base
    ...Object.values(base),
    // Layouts
    ...Object.values(layouts),
    // Components
    ...Object.values(components),
  ),
}
