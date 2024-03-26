const fs = require('node:fs')
const path = require('node:path')

function findPackageNamesSync(rootDir) {
  try {
    const packageNames = []

    // 遞迴搜尋目錄的函數
    function searchDirectories(directory) {
      const files = fs.readdirSync(directory)

      for (const file of files) {
        const fullPath = path.join(directory, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          // 排除目錄
          if (['node_modules', '.git', '.turbo', '.output', 'output', '.nuxt', 'build', 'node-jiti', 'dist', 'tmp', 'temp', 'coverage'].includes(file)) continue

          const packageJsonPath = path.join(fullPath, 'package.json')

          try {
            const packageJson = fs.readFileSync(packageJsonPath, 'utf-8')
            const { name } = JSON.parse(packageJson)

            // 檢查是否有組織名
            const packageNameParts = name.split('/')
            const packageNameWithoutScope = packageNameParts.length > 1 ? packageNameParts[1] : packageNameParts[0]
            packageNames.push(packageNameWithoutScope)
          }
          catch (error) {
            if (error.code !== 'ENOENT') {
              // 如果非找不到檔案的錯誤，請將錯誤拋出
              throw error
            }
          }

          // 遞迴處理子目錄
          searchDirectories(fullPath)
        }
      }
    }

    // 開始搜尋
    searchDirectories(rootDir)

    return packageNames
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = {
  findPackageNamesSync,
}
