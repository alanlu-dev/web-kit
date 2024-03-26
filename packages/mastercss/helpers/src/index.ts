/**
 * 一個函數，它接受“strings”數組和“tokens”作為參數並返回一個字符串。
 *
 * @param {TemplateStringsArray} strings - 用作模板的字符串數組。
 * @param {any[]} tokens - 要插入到模板中的標記數組。
 * @return {string} - 將標記插入模板後得到的字符串。
 */
function literal(strings: TemplateStringsArray, ...tokens: any[]): string {
  return strings
    .reduce((result, value, index) => result + value + (tokens[index] || ''), '')
    .replace(/\/\*[\s\S]*?\*\//gm, '') // 允許註解
    .replace(/(?:\n(?:\s*))+/g, ' ')
    .trim()
}

const replacedSymbol = '_$'
const replacedConnectMainSymbol = '_$$'

interface GroupConfig {
  /** 先代選擇器 */
  parent?: string
  /** 樣式 */
  cls: string
  /** 後代選擇器 */
  selector: string
  /** 媒體選擇器 */
  mq?: string
  /** 範圍 */
  scope?: string
  /** 是否印出結果 */
  showLog?: boolean
}

/**
 * 根據提供的配置生成 CSS 組字符串。
 *
 * @param config - 用於生成 CSS 組字符串的配置對象。
 * @returns CSS 組字符串。
 */
function group(config: GroupConfig): string {
  const { parent, selector, cls, mq, scope } = config

  const unitArr: string[] = []
  const otherGroup: string[] = []

  // 依空格拆分
  cls.split(' ').forEach((target) => {
    // 如果非群組，直接新增
    if (!target.includes('{')) {
      unitArr.push(target)
    }
    // 否則進行群組處理
    else {
      // 先代選擇器 群組樣式 後代選擇器
      const reg = /^(.+){0,1}{(.+)}(.+){0,1}$/
      const r = target.match(reg)!

      // 先代選擇器
      let _parent: GroupConfig['parent'] = r[1] || ''
      if (_parent) {
        if (_parent.includes(replacedConnectMainSymbol) && parent) {
          const [lastCharacter, previousCharacters] = [parent.slice(-1), parent.slice(0, -1)]
          _parent = _parent.replace(replacedConnectMainSymbol, previousCharacters) + lastCharacter
        }
        else if (_parent.includes(replacedSymbol) && parent) {
          _parent = _parent.replace(replacedSymbol, parent)
        }
        else if (parent) {
          _parent = parent + _parent
        }
      }
      else if (parent) {
        _parent = parent
      }

      // 媒體選擇器
      let _mq: GroupConfig['mq'] = mq || ''
      // 後代選擇器
      let _selector: GroupConfig['selector'] = r[3] || ''

      // 後代選擇器為媒體查詢
      if (_selector[0] === '@') {
        _mq = _selector
        _selector = selector
      }

      if (_selector) {
        // 替換 _$
        if (_selector.includes(replacedSymbol) && selector) {
          _selector = _selector.replace(replacedSymbol, selector)
        }
        else if (selector) {
          _selector = selector + _selector
        }
      }
      else if (selector) {
        _selector = selector
      }

      try {
        otherGroup.push(
          group({
            parent: _parent,
            cls: r[2].split(';').join(' '),
            selector: _selector,
            mq: _mq,
            scope,
          }),
        )
      }
      catch (error) {
        console.log(target, error)
      }
    }
  })

  const styles = unitArr.join(';')

  const buildCls = `${scope ? `${scope}_` : ''}${parent || ''}{${styles}}${selector || ''}${mq || ''}`

  return `${buildCls}${otherGroup.length ? ` ${otherGroup.join(' ')}` : ''}`
}

interface ToLineOptions {
  /** 範圍 */
  scope: string
  /** 是否印出結果 */
  showLog: boolean
}

/**
 * Generates a line of styles based on the given object and options.
 *
 * @param {Record<string, string>} obj - The object containing the selectors and styles.
 * @param {Partial<ToLineOptions>} [options] - The optional options for generating the line.
 * @returns {string} - The generated line of styles.
 */
function toLine(obj: Record<string, string>, options: Partial<ToLineOptions> = {}): string {
  const styles = Object.entries(obj).reduce<string[]>((cls, [selector, styles]) => {
    const temp = selector.replace(replacedSymbol, '')
    // 以下結尾視為先代選擇器
    if (['_', '>', '~', '+'].includes(temp.charAt(temp.length - 1))) {
      styles = group({
        parent: selector,
        selector: '',
        cls: styles,
        scope: options?.scope,
        showLog: options?.showLog,
      })
    }
    // 以下開頭視為後代選擇器
    else if (['_', '>', '~', '+', ':', '[', '@', '!'].includes(temp[0]) || options?.scope) {
      styles = group({
        selector,
        cls: styles,
        scope: options?.scope,
        showLog: options?.showLog,
      })
    }

    return cls.concat(styles)
  }, [])

  // 印出結果
  if (options.showLog) console.log('toLine', styles)

  // 合併樣式
  return styles.join(' ')
}

export { literal as cls, group, toLine }
