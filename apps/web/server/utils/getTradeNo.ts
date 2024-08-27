import { format } from '@formkit/tempo'

// 取得訂單編號
export function getTradeNo(prefix = ''): string {
  const date = format({ date: new Date(), format: 'YYYYMMDDHHmmss', locale: 'zh-TW', tz: 'Asia/Taipei' })
  const randomNum = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0')

  return `${prefix}${date}${randomNum}`
}
