import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 200 }, // 30 秒間逐步把用戶加到 10 個
    { duration: '1m30s', target: 300 }, // 在一分半內逐步從 10 個用戶追加到 30 個用戶
    { duration: '20s', target: 0 }, // 在 20 秒內逐步從 30 個用戶 降到 0 個用戶個用戶
  ],
}

export default function () {
  const res = http.get('http://localhost:3000')
  check(res, { 'status was 200': (r) => r.status === 200 })
  sleep(1)
}
