import { getBusinessStatus } from './index'

const closingTimeThreshold = 3600000 // 1 hour

vi.useFakeTimers()
describe('營業狀態(白天)', () => {
  it('營業前', () => {
    vi.setSystemTime(new Date('2023-12-04T07:59:00'))
    const status = getBusinessStatus(new Date(), '08:00', '18:00', closingTimeThreshold)
    expect(status.isOpen).toBe(false)
    expect(status.timeToOpen).toBe(60 * 1000) // 1 分鐘後開業
    expect(status.timeToClose).toBe(-1)
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業開始時', () => {
    vi.setSystemTime(new Date('2023-12-04T08:00:00'))
    const status = getBusinessStatus(new Date(), '08:00', '18:00', closingTimeThreshold)
    expect(status.isOpen).toBe(true)
    expect(status.timeToOpen).toBe(-1)
    expect(status.timeToClose).toBe(10 * 60 * 60 * 1000) // 10 小時後關業
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業中', () => {
    vi.setSystemTime(new Date('2023-12-04T12:00:00'))
    const status = getBusinessStatus(new Date(), '08:00', '18:00', closingTimeThreshold)
    expect(status.isOpen).toBe(true)
    expect(status.timeToOpen).toBe(-1)
    expect(status.timeToClose).toBe(6 * 60 * 60 * 1000) // 6 小時後關業
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業即將結束', () => {
    vi.setSystemTime(new Date('2023-12-04T17:00:00'))
    const status = getBusinessStatus(new Date(), '08:00', '18:00', closingTimeThreshold)
    expect(status.isOpen).toBe(true)
    expect(status.timeToOpen).toBe(-1)
    expect(status.timeToClose).toBe(1 * 60 * 60 * 1000) // 1 小時後關業
    expect(status.upcomingClosure).toBe(true)
  })

  it('營業結束時', () => {
    vi.setSystemTime(new Date('2023-12-04T18:00:00'))
    const status = getBusinessStatus(new Date(), '08:00', '18:00', closingTimeThreshold)
    expect(status.isOpen).toBe(false)
    expect(status.timeToOpen).toBe(14 * 60 * 60 * 1000) // 14 小時後再次開業
    expect(status.timeToClose).toBe(-1)
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業結束後', () => {
    vi.setSystemTime(new Date('2023-12-04T19:00:00'))
    const status = getBusinessStatus(new Date(), '08:00', '18:00', closingTimeThreshold)
    expect(status.isOpen).toBe(false)
    expect(status.timeToOpen).toBe(13 * 60 * 60 * 1000) // 13 小時後再次開業
    expect(status.timeToClose).toBe(-1)
    expect(status.upcomingClosure).toBe(false)
  })
})

describe('營業狀態(跨夜)', () => {
  it('營業前', () => {
    vi.setSystemTime(new Date('2023-12-04T21:59:00'))
    const status = getBusinessStatus(new Date(), '22:00', '02:00', closingTimeThreshold)
    expect(status.isOpen).toBe(false)
    expect(status.timeToOpen).toBe(60 * 1000) // 1 分鐘後開業
    expect(status.timeToClose).toBe(-1)
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業開始時', () => {
    vi.setSystemTime(new Date('2023-12-04T22:00:00'))
    const status = getBusinessStatus(new Date(), '22:00', '02:00', closingTimeThreshold)
    expect(status.isOpen).toBe(true)
    expect(status.timeToOpen).toBe(-1)
    expect(status.timeToClose).toBe(4 * 60 * 60 * 1000) // 4 小時後關業
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業中', () => {
    vi.setSystemTime(new Date('2023-12-05T00:00:00'))
    const status = getBusinessStatus(new Date(), '22:00', '02:00', closingTimeThreshold)
    expect(status.isOpen).toBe(true)
    expect(status.timeToOpen).toBe(-1)
    expect(status.timeToClose).toBe(2 * 60 * 60 * 1000) // 2 小時後關業
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業即將結束', () => {
    vi.setSystemTime(new Date('2023-12-05T01:00:00'))
    const status = getBusinessStatus(new Date(), '22:00', '02:00', closingTimeThreshold)
    expect(status.isOpen).toBe(true)
    expect(status.timeToOpen).toBe(-1)
    expect(status.timeToClose).toBe(1 * 60 * 60 * 1000) // 1 小時後關業
    expect(status.upcomingClosure).toBe(true)
  })

  it('營業結束時', () => {
    vi.setSystemTime(new Date('2023-12-05T02:00:00'))
    const status = getBusinessStatus(new Date(), '22:00', '02:00', closingTimeThreshold)
    expect(status.isOpen).toBe(false)
    expect(status.timeToOpen).toBe(20 * 60 * 60 * 1000) // 20 小時後再次開業
    expect(status.timeToClose).toBe(-1)
    expect(status.upcomingClosure).toBe(false)
  })

  it('營業結束後', () => {
    vi.setSystemTime(new Date('2023-12-05T03:00:00'))
    const status = getBusinessStatus(new Date(), '22:00', '02:00', closingTimeThreshold)
    expect(status.isOpen).toBe(false)
    expect(status.timeToOpen).toBe(19 * 60 * 60 * 1000) // 19 小時後再次開業
    expect(status.timeToClose).toBe(-1)
    expect(status.upcomingClosure).toBe(false)
  })
})
