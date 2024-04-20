const path = require('node:path')
const fs = require('node:fs')
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

const root = findPackageJson(__dirname)
const packageJson = fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8')

const packageName = packageJson.name
const scope = packageName.split('/')[1]

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
    pushRepo: packageJson.repository.url,
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
