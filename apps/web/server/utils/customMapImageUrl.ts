export function customMapImageUrl(url: string | undefined, id: string, block: string = 'block'): string | undefined {
  if (!url) return undefined

  if (url.startsWith('data:')) return url

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith('https://images.unsplash.com')) return url

  try {
    const u = new URL(url)

    if (u.pathname.startsWith('/secure.notion-static.com') && u.hostname.endsWith('.amazonaws.com')) {
      if (u.searchParams.has('X-Amz-Credential') && u.searchParams.has('X-Amz-Signature') && u.searchParams.has('X-Amz-Algorithm')) {
        // if the URL is already signed, then use it as-is
        url = u.origin
      }
    }
    else if (u.hostname.endsWith('.amazonaws.com')) {
      const temp = u.pathname.split('/')
      const fileId = temp[2]
      const fileName = temp[3]
      url = `https://s3-us-west-2.amazonaws.com/secure.notion-static.com/${fileId}/${fileName}`
    }
  }
  catch {
    // ignore invalid urls
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`
  }

  url = `https://www.notion.so${url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`}`

  const notionImageUrlV2 = new URL(url)
  notionImageUrlV2.searchParams.set('table', block)
  notionImageUrlV2.searchParams.set('id', id)
  notionImageUrlV2.searchParams.set('cache', 'v2')

  url = notionImageUrlV2.toString()

  return url
}

export function mapImgUrl(img: string | undefined, id: string, type: string = 'block', needCompress: boolean = true): string | undefined {
  console.log(img)
  if (!img) return undefined

  if (img.startsWith('data:')) return img

  let url: string | undefined
  // 相對路徑，則視為 notion 的自帶圖片
  if (img.startsWith('/')) {
    url = `https://www.notion.so${img}`
  }
  else {
    url = img
  }

  // Notion 圖床轉換為永久地址
  const hasConverted = url.indexOf('https://www.notion.so/image') === 0 || url.includes('notion.site/images/page-cover/')
  // 需要轉化的 url; 識別 aws 圖床地址
  const needConvert = !hasConverted && (url.includes('secure.notion-static.com') || url.includes('prod-files-secure'))

  // 使用 notion 圖床
  if (needConvert) {
    try {
      const u = new URL(url)
      url = u.origin + u.pathname
    }
    catch {
      // ignore invalid urls
    }

    url = `https://www.notion.so/image/${encodeURIComponent(url)}?table=${type}&id=${id}`
  }

  if (!isEmoji(url) && !url.includes('notion.so/images/page-cover')) {
    // 图片url优化，确保每一篇文章的图片url唯一
    if (url && url.length > 4 && !url.includes('https://www.notion.so/images/')) {
      // 图片接口拼接唯一识别参数，防止请求的图片被缓，而导致随机结果相同
      const separator = url.includes('?') ? '&' : '?'
      url = `${url.trim()}${separator}t=${id}`
    }
  }

  // 统一压缩图片
  if (needCompress) {
    // const width = block?.format?.block_width
    url = compressImage(url)
  }

  return url
}

function isEmoji(str: string) {
  // eslint-disable-next-line style/operator-linebreak
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}\u{2B06}\u{2B07}\u{2B05}\u{2194}-\u{2199}\u{21A9}\u{21AA}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{25B6}\u{25C0}]/u
  return emojiRegex.test(str)
}

/**
 * 压缩图片
 * 1. Notion图床可以通过指定url-query参数来压缩裁剪图片 例如 ?xx=xx&width=400
 * 2. UnPlash 图片可以通过api q=50 控制压缩质量 width=400 控制图片尺寸
 * @param {*} image
 */
function compressImage(image: string | undefined, width: number = 1280, quality: number = 50, fmt: string = 'webp'): string | undefined {
  if (!image || image.indexOf('http') !== 0) {
    return image
  }

  if (image.includes('.svg')) return image

  // 将URL解析为一个对象
  const urlObj = new URL(image)
  // 获取URL参数
  const params = new URLSearchParams(urlObj.search)

  // Notion图床
  if (image.indexOf('https://www.notion.so') === 0 && image.indexOf('amazonaws.com') > 0) {
    params.set('width', width.toString())
    params.set('cache', 'v2')
    // 生成新的URL
    urlObj.search = params.toString()
    return urlObj.toString()
  }
  else if (image.indexOf('https://images.unsplash.com/') === 0) {
    // 压缩unsplash图片
    // 将q参数的值替换
    params.set('q', quality.toString())
    // 尺寸
    params.set('width', width.toString())
    // 格式
    params.set('fmt', fmt)
    params.set('fm', fmt)
    // 生成新的URL
    urlObj.search = params.toString()
    return urlObj.toString()
  }
  else if (image.indexOf('https://your_picture_bed') === 0) {
    // 此处还可以添加您的自定义图传的封面图压缩参数。
    // .e.g
    return 'do_somethin_here'
  }

  return image
}
