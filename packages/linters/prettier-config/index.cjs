module.exports = {
  plugins: ['prettier-plugin-brace-style'],
  braceStyle: 'stroustrup',

  // Use curious ternaries, with the question mark after the condition
  experimentalTernaries: false,

  // 每行最多字元數量，超出換行（默認80）
  printWidth: 200,
  // 縮排空格數量，默認2個空格
  tabWidth: 2,
  // 指定縮排方式，空格或tab，默認false，即使用空格
  useTabs: false,
  // 結尾添加分號，默認true
  semi: false,
  // 使用單引號，默認false
  singleQuote: true,
  // 物件屬性是否使用引號（as-needed | consistent | preserve;默認as-needed:物件的屬性需要加引號才添加）
  quoteProps: 'consistent',
  // 在 JSX 中使用單引號替代雙引號，默認false
  jsxSingleQuote: true,
  // 元素末尾是否加上逗號，默認all
  trailingComma: 'all',
  // 物件字面量的括號之間是否加上空格（true - 範例: { foo: bar } ; false - 範例: {foo:bar}）
  bracketSpacing: true,
  // 開始標籤的右尖括號是否跟隨在最後一行屬性末尾，默認為false
  bracketSameLine: false,
  // 單個參數箭頭函式是否要使用小括號（always:始終顯示;avoid:省略括號。默認:always)
  arrowParens: 'always',
  // 是否只格式化包含特定註解（@prettier| @format）的檔案，默認false
  requirePragma: false,
  // 當檔案已經被 Prettier 格式化之後，是否在檔案頂部插入一個特殊的 @format 標記，默認false
  insertPragma: false,
  // 超出打印寬度 (always | never | preserve )
  proseWrap: 'preserve',
  // 指定 HTML 檔案的空格敏感度 (css|strict|ignore;默認css)
  htmlWhitespaceSensitivity: 'strict',
  // Vue 檔案中是否縮排 <style> 和 <script> 標籤，默認false
  vueIndentScriptAndStyle: false,
  // 使用哪種結尾換行（lf|crlf|cr|auto;默認lf）
  endOfLine: 'lf',
  // 是否格式化一些文件中嵌入的程式碼片段的風格（auto|off;默認auto）
  embeddedLanguageFormatting: 'auto',
  // 是否每個屬性都獨自佔一行，默認false
  singleAttributePerLine: false,
}
