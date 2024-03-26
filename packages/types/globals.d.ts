/**
 * 巢狀物件
 * @see https://medium.com/onedegree-tech-blog/feat-typescript-conditional-types-4a47b4816ce2
 */
type Simplify<T> = T extends Record<string, any> ? { [K in keyof T]: Simplify<T[K]> } : T

// 提取特定 type 型別的助手類型函數
type ExtractSchemaType<T, U> = T extends { type: U } ? T : never

interface IOption {
  label: string
  value: string
}

/**
 * json-patch
 * @see https://www.npmjs.com/package/@types/json-patch
 */
type OpPatch = AddPatch | RemovePatch | ReplacePatch | MovePatch | CopyPatch | TestPatch
interface Patch {
  path: string
}
interface AddPatch extends Patch {
  op: 'add'
  value: any
}
interface RemovePatch extends Patch {
  op: 'remove'
}
interface ReplacePatch extends Patch {
  op: 'replace'
  value: any
}
interface MovePatch extends Patch {
  op: 'move'
  from: string
}
interface CopyPatch extends Patch {
  op: 'copy'
  from: string
}
interface TestPatch extends Patch {
  op: 'test'
  value: any
}
