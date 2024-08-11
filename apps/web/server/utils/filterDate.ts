// 檢查是否有在起訖時間內
export function isWithinDateRange(data: { start: string; end: string | null } | null): boolean {
  // 如果沒有起始時間，視為在範圍內
  if (!data?.start) return true

  const start = new Date(data.start)
  const check = new Date()

  // 如果沒有結束時間，只判斷起始時間
  if (!data.end) return check >= start

  const end = new Date(data.end)

  // 如果有起訖，兩個一起判斷
  return check >= start && check <= end
}
