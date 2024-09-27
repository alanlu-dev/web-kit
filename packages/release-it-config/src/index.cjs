const fs = require('node:fs')
const path = require('node:path')
const versionConfig = require('./.versionrc.cjs')

// eslint-disable-next-line no-template-curly-in-string
const version = '${version}'

function findPackageJson(startPath) {
  let currentPath = startPath

  while (currentPath !== '/') {
    const packageJson = path.join(currentPath, 'package.json')

    if (fs.existsSync(packageJson)) {
      return currentPath
    }

    currentPath = path.dirname(currentPath)
  }

  throw new Error('package.json not found')
}

const root = findPackageJson(process.cwd())
const packageJsonPath = path.join(root, 'package.json')
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')
const packageJson = JSON.parse(packageJsonContent)

const packageName = packageJson.name
const scope = packageName.split('/')[1]

let pushRepo = packageJson.repository.url.replace(/^git\+/, '')
if (!pushRepo.startsWith('https://')) {
  pushRepo = pushRepo.replace(/^http:\/\//, 'https://')
}
if (!pushRepo.endsWith('.git')) {
  pushRepo += '.git'
}

module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      path: '.',
      gitRawCommitsOpts: {
        path: '.',
      },
      infile: 'CHANGELOG.md',
      header: '# Changelog',
      preset: {
        name: 'conventionalcommits',
        ...versionConfig,
      },
    },
  },
  git: {
    requireBranch: 'main',
    push: true,
    tagName: `${packageName}@${version}`,
    pushRepo,
    commitsPath: '.',
    commitMessage: `chore(${scope}): released version v${version} [skip ci]`,
    requireCommits: true,
    requireCommitsFail: false,
  },
  npm: {
    publish: true,
    versionArgs: ['--workspaces false'],
  },
  github: {
    release: true,
    releaseName: `${packageName}@${version}`,
  },
  hooks: {
    'before:git:release': ['pnpm release-it-bump'],
  },
}
