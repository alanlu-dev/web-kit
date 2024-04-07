const versionConfig = require('./.versionrc.cjs')

// eslint-disable-next-line no-template-curly-in-string
const version = '${version}'

const packageName = process.env.npm_package_name
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
    pushRepo: 'git@github.com:jiehousekeeper/official-site.git',
    commitsPath: '.',
    commitMessage: `chore(${scope}): released version v${version} [no ci]`,
    requireCommits: true,
    requireCommitsFail: false,
  },
  npm: {
    publish: false,
    // versionArgs: ['--workspaces false'],
  },
  github: {
    // requireCleanWorkingDir: false,
    release: true,
    releaseName: `${packageName}@${version}`,
  },
  hooks: {
    'before:git:release': ['pnpm release-it-bump && git add **/dependencies.json'],
  },
}
