function formatThousand(price?: number) {
  if (!price) return '0'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function replaceRelativePathsWithAbsolute(htmlContent: string, baseUrl: string) {
  // 構建用於匹配 img src 屬性和 a href 屬性的正則表達式
  const regex = /(<img [^>]*src=|<a [^>]*href=)"([^"]*)"/g

  // 替換相對路徑
  return htmlContent.replace(regex, (match, prefix, url) => {
    // 檢查是否為相對路徑
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//')) {
      // 構建絕對路徑
      return `${prefix}"${new URL(url, baseUrl).href}"`
    }
    return match
  })
}

function replaceImgTagIfSrcContains(htmlContent: string, substring: string, newImgTag: string) {
  // 構建用於匹配 img 標籤並檢查 src 屬性的正則表達式
  const regex = /<img [^>]*src="([^"]*)"[^>]*>/g

  // 替換含特定字串的 img 標籤
  return htmlContent.replace(regex, (match, src) => {
    // 檢查 src 屬性是否包含特定字串
    if (src.includes(substring)) {
      // 替換為新的 img 標籤
      return newImgTag
    }
    return match
  })
}

export { formatThousand, replaceImgTagIfSrcContains, replaceRelativePathsWithAbsolute }
