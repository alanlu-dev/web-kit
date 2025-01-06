/* eslint-disable regexp/no-contradiction-with-assertion */
export const regex = {
  // zod's email regex https://github.com/colinhacks/zod/blob/main/src/types.ts#L599
  email: /^(?!\.)(?!.*\.\.)([\w'+\-.]*)[\w+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  mobile: /^09\d{8}$/,
  password: /^[a-z0-9]{8,16}$/i,
}
