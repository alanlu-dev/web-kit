import { cls, group, toLine } from './index'

describe('cls function', () => {
  it('should return a string with tokens inserted', () => {
    const result = cls`Hello, ${'World'}!`
    expect(result).toBe('Hello, World!')
  })
})

describe('group function', () => {
  it('should return a CSS group string based on the provided config', () => {
    const config = {
      parent: 'parent',
      cls: 'class',
      selector: 'selector',
    }
    const result = group(config)
    expect(result).toBe('parent{class}selector')
  })
})

describe('toLine function', () => {
  it('should return a line of styles based on the given object and options', () => {
    const obj = {
      '.selector': 'style',
    }
    const options = {
      scope: 'scope',
      showLog: false,
    }
    const result = toLine(obj, options)
    expect(result).toBe('scope_{style}.selector')
  })
})
