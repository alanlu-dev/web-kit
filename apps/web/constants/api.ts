import { z } from 'zod'

export enum RETURN_CODE {
  /** 預設 */
  NONE = 0,
  /** 成功 */
  SUCCESS = 200,
  /** 失敗 */
  FAIL = -1,
  /** 參數錯誤 */
  BAD_REQUEST = -400,
  /** User身分錯誤 */
  UNAUTHORIZED = -401,
  /** 沒有權限 */
  FORBIDDEN = -403,
  /** 資源不存在 */
  NOT_FOUND = -404,
  /** 系統錯誤 */
  SYSTEM_ERROR = -500,
}
export const RETURN_CODE_SCHEMA = z.nativeEnum(RETURN_CODE)
export type RETURN_CODE_TYPE = z.infer<typeof RETURN_CODE_SCHEMA>
