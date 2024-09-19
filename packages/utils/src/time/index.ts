function getBusinessStatus(now: Date = new Date(), startTime: string, endTime: string, closingTimeThreshold: number = 3600000) {
  // 開始和結束時間轉換為當天的日期時間。
  const startDate = new Date(`${now.toDateString()} ${startTime}`)
  const endDate = new Date(`${now.toDateString()} ${endTime}`)

  // 考慮跨午夜的情況
  if (endDate <= startDate) {
    endDate.setDate(endDate.getDate() + 1)
  }

  // 調整當前時間是凌晨但在營業時間內的情況
  if (now < startDate && now.getHours() < 12) {
    startDate.setDate(startDate.getDate() - 1)
    endDate.setDate(endDate.getDate() - 1)
  }

  const isOpen = now >= startDate && now < endDate
  const timeToOpen = isOpen ? -1 : now < startDate ? startDate.getTime() - now.getTime() : startDate.getTime() + 86400000 - now.getTime()
  const timeToClose = !isOpen ? -1 : endDate.getTime() - now.getTime()
  const upcomingClosure = isOpen && timeToClose <= closingTimeThreshold

  return {
    isOpen,
    timeToOpen,
    timeToClose,
    upcomingClosure,
  }
}

function formatCountdown(timeInMilliseconds) {
  if (timeInMilliseconds < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  let seconds = Math.floor(timeInMilliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  seconds = seconds % 60
  minutes = minutes % 60
  hours = hours % 24

  return { days, hours, minutes, seconds }
}

export { formatCountdown, getBusinessStatus }
