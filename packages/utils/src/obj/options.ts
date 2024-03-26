type OptionsProp = OptionsPropExtensions[keyof OptionsPropExtensions]
interface OptionsPropExtensions {
  arrayOfStrings: string[]
  arrayOfNumbers: number[]
  optionsList: Simplify<OptionsList>
  valueLabelPojo: Record<string | number, string>
}
type OptionsList = OptionsItem[]
interface OptionsItem {
  label: string
  value: unknown
  attrs?: {
    disabled?: boolean
  } & Record<string, any>
  __original?: any
  [index: string]: any
}

function normalizeOptions(options: OptionsProp): OptionsList {
  let i = 1
  if (Array.isArray(options)) {
    return options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: String(option),
          value: String(option),
        }
      }
      if (typeof option == 'object') {
        if ('value' in option && typeof option.value !== 'string') {
          Object.assign(option, {
            value: `__mask_${i++}`,
            __original: option.value,
          })
        }
      }
      return option
    })
  }
  return Object.entries(options).map(([value, label]) => ({ label, value }))
}

export { normalizeOptions }
