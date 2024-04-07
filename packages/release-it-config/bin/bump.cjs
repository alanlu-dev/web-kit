#!/usr/bin/env node

const fs = require('node:fs').promises
const path = require('node:path')
const { glob } = require('glob')
const yaml = require('js-yaml')

async function main() {
  try {
    const workspaceData = await fs.readFile(`${process.cwd()}/pnpm-workspace.yaml`, 'utf8')
    const workspace = yaml.load(workspaceData)
    const packages = workspace.packages

    const packagePaths = []

    for (const pattern of packages) {
      const jsfiles = await glob(`${pattern}/package.json`, { ignore: '**/node_modules/**' })
      for (const file of jsfiles) {
        const packagePath = path.dirname(file)
        packagePaths.push(packagePath)
      }
    }

    const workspacePackages = await Promise.all(
      packagePaths.map(async (packagePath) => {
        const pkgData = await fs.readFile(path.join(packagePath, 'package.json'), 'utf8')
        const pkg = JSON.parse(pkgData)
        return {
          name: pkg.name,
          version: pkg.version,
          dependencies: pkg.dependencies || {},
          devDependencies: pkg.devDependencies || {},
          folder: packagePath,
        }
      }),
    )

    console.log(workspacePackages)
    const dependenciesMap = checkPackageDependencies(workspacePackages)
    await writeDependenciesJson(workspacePackages, dependenciesMap)
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
      if (dependencyVersion === 'workspace:*') {
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

async function writeDependenciesJson(workspacePackages, dependenciesMap) {
  for (const [packageName, dependencies] of dependenciesMap.entries()) {
    const jsonFilePath = path.join(workspacePackages.find((p) => p.name === packageName).folder, 'dependencies.json')

    try {
      const jsonContent = JSON.stringify(dependencies, null, 2)
      await fs.writeFile(jsonFilePath, jsonContent)
      console.log(`Dependencies JSON file for ${packageName} written successfully.`)
    }
    catch (error) {
      console.error(`Error writing dependencies JSON file for ${packageName}:`, error)
    }
  }
}

main()
