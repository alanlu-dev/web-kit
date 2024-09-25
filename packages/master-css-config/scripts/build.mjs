import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const buildDir = resolve(currentDir, '../dist')
const buildVendorsDir = resolve(buildDir, './vendors')

// 建置檔案
function buildFile(filePath, content) {
  const cjsContent = `module.exports = ${content}`
  const esmContent = `export default ${content}`
  fs.writeFileSync(filePath.replace('.mjs', '.cjs'), cjsContent)
  fs.writeFileSync(filePath, esmContent)
}

// 動態引入檔案內容，並建置檔案
async function buildModuleAndFile(srcPath, destPath) {
  const moduleContent = await import(srcPath)
  const content = JSON.stringify(moduleContent.default)
  buildFile(destPath, content)
}

async function build() {
  fs.mkdirSync(buildDir, { recursive: true })
  fs.mkdirSync(buildVendorsDir, { recursive: true })

  await buildModuleAndFile('../styles/master.css.mjs', resolve(buildDir, './index.mjs'))
  await buildModuleAndFile('../styles/base/breakpoints.mjs', resolve(buildDir, './breakpoints.mjs'))
  fs.copyFile(resolve(currentDir, '../styles/base/breakpoints.d.ts'), resolve(buildDir, './breakpoints.d.ts'), (err) => {
    if (err) throw err
    console.log('breakpoints.d.ts was copied to dist directory')
  })

  const vendorsDir = resolve(currentDir, '../styles/vendors')
  const vendorFiles = fs.readdirSync(vendorsDir)

  await Promise.all(
    vendorFiles.map(async (file) => {
      await buildModuleAndFile(`../styles/vendors/${file}`, resolve(buildVendorsDir, `./${file}`))
    }),
  )
}

build()
