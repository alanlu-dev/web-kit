export function maskName(name: string | undefined): string {
  if (!name || name.length <= 1) {
    return '○'
  }
  const firstChar = name[0]
  const lastChar = name[name.length - 1]
  const maskedMiddle = '○'.repeat(name.length - 2)
  return `${firstChar}${maskedMiddle}${lastChar}`
}
