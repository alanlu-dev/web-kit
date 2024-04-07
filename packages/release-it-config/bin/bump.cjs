#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { glob } = require('glob')
const yaml = require('js-yaml')

function main() {
  try {
    const workspaceData = fs.readFileSync(`${process.cwd()}/pnpm-workspace.yaml`, 'utf8')
    const workspace = yaml.load(workspaceData)
    const packages = workspace.packages

    const packagePaths = []

    for (const pattern of packages) {
      const packageFiles = glob.sync(`${pattern}/package.json`, { ignore: '**/node_modules/**' })
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
    }
    catch (error) {
      console.error(`Error writing dependencies JSON file for ${packageName}:`, error)
    }
  }
}

main()
