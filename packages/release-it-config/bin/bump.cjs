#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')
const { glob } = require('glob')
const yaml = require('js-yaml')

function findWorkspaceRoot(startPath) {
  let currentPath = startPath

  while (currentPath !== '/') {
    const workspaceFile = path.join(currentPath, 'pnpm-workspace.yaml')

    if (fs.existsSync(workspaceFile)) {
      return currentPath
    }

    currentPath = path.dirname(currentPath)
  }

  throw new Error('pnpm-workspace.yaml not found')
}

function main() {
  try {
    const workspaceRoot = findWorkspaceRoot(__dirname)
    const workspaceData = fs.readFileSync(path.join(workspaceRoot, 'pnpm-workspace.yaml'), 'utf8')
    const workspace = yaml.load(workspaceData)
    const packages = workspace.packages

    const packagePaths = []

    for (const pattern of packages) {
      const fullPattern = path.join(workspaceRoot, pattern, 'package.json')
      const ignorePattern = path.join(workspaceRoot, '**/node_modules/**')
      const packageFiles = glob.sync(fullPattern, { ignore: ignorePattern })
      for (const file of packageFiles) {
        const packagePath = path.dirname(file)
        packagePaths.push(packagePath)
      }
    }

    const workspacePackages = packagePaths.map((packagePath) => {
      const pkgData = fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8')
      const pkg = JSON.parse(pkgData)
      return {
        name: pkg.name,
        version: pkg.version,
        dependencies: pkg.dependencies || {},
        devDependencies: pkg.devDependencies || {},
        folder: packagePath,
      }
    })

    // console.log(workspacePackages)
    const dependenciesMap = checkPackageDependencies(workspacePackages)
    writeDependenciesJson(workspacePackages, dependenciesMap)
  }
  catch (error) {
    console.error('Error occurred:', error)
  }
}

function checkPackageDependencies(packages) {
  const usedDependencies = new Map()

  for (const pkg of packages) {
    const version = {
      [pkg.name]: pkg.version,
    }
    const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }
    for (const [dependencyName, dependencyVersion] of Object.entries(dependencies)) {
      if (dependencyVersion.startsWith('workspace:')) {
        const workspacePackage = packages.find((p) => p.name === dependencyName)
        if (workspacePackage) {
          version[dependencyName] = workspacePackage.version
        }
      }
    }

    usedDependencies.set(pkg.name, version)
  }

  return usedDependencies
}

function writeDependenciesJson(workspacePackages, dependenciesMap) {
  for (const [packageName, dependencies] of dependenciesMap.entries()) {
    const packageInfo = workspacePackages.find((p) => p.name === packageName)
    if (!packageInfo) {
      console.error(`Package info not found for ${packageName}.`)
      continue
    }
    const jsonFilePath = path.join(packageInfo.folder, 'dependencies.json')

    try {
      const jsonContent = JSON.stringify(dependencies, null, 2)
      fs.writeFileSync(jsonFilePath, jsonContent)
      console.log(`Dependencies JSON file for ${packageName} written successfully.`)

      // Add the new file to git
      execSync(`git add ${jsonFilePath}`, { stdio: 'inherit' })
      console.log(`Added ${jsonFilePath} to git.`)
    }
    catch (error) {
      console.error(`Error writing dependencies JSON file for ${packageName}:`, error)
    }
  }
}

main()
