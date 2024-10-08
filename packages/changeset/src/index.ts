import type { Changeset } from '@changesets/types'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import readChangeset from '@changesets/read'
import writeChangeset from '@changesets/write'
import { getPackagesSync } from '@manypkg/get-packages'
import { Command } from 'commander'

export interface PkgJson {
  name?: string
  version?: string
  private?: boolean
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  bundledDependencies?: string[]
  bin?: string | Record<string, string>
  scripts?: Record<string, string>
  engines?: Record<string, string>
  files?: string[]
  main?: string
  browser?: string
  types?: string
  typings?: string
  module?: string
  unpkg?: string
  sideEffects?: boolean
  workspaces?: string[]
}

export interface ManyPkgPackage {
  packageJson: PkgJson
  dir: string
}

export interface ManyPkgPackages {
  packages: ManyPkgPackage[]
  root: ManyPkgPackage
}

interface Commit {
  commitHash: string
  commitMessage: string
}

interface ConventionalMessagesToCommits {
  changelogMessage: string
  commitHashes: string[]
}

/*
 * Copied from conventional commits config:
 * https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-conventionalcommits/writer-opts.js
 * "section" is currently unused but is left in, with the intent to update changeset changelog generation once more fleshed out
 */
const defaultCommitTypes = [
  { type: 'feat', section: 'Features' },
  { type: 'feature', section: 'Features' },
  { type: 'fix', section: 'Bug Fixes' },
  { type: 'perf', section: 'Performance Improvements' },
  { type: 'revert', section: 'Reverts' },
  { type: 'docs', section: 'Documentation' },
  { type: 'style', section: 'Styles' },
  { type: 'chore', section: 'Miscellaneous Chores' },
  { type: 'refactor', section: 'Code Refactoring' },
  { type: 'test', section: 'Tests' },
  { type: 'build', section: 'Build System' },
  { type: 'ci', section: 'Continuous Integration' },
]

export function isBreakingChange(commit: string) {
  return commit.includes('BREAKING CHANGE:') || defaultCommitTypes.some((commitType) => commit.match(new RegExp(`^${commitType.type}(?:(.*))?!:`)))
}

export function isConventionalCommit(commit: string) {
  return defaultCommitTypes.some((commitType) => commit.match(new RegExp(`^${commitType.type}(?:(.*))?!?:`)))
}

/* Attempts to associate non-conventional commits to the nearest conventional commit */
export function associateCommitsToConventionalCommitMessages(commits: Commit[]): ConventionalMessagesToCommits[] {
  return commits.reduce((acc, curr) => {
    if (!acc.length) {
      return [
        {
          changelogMessage: curr.commitMessage,
          commitHashes: [curr.commitHash],
        },
      ]
    }

    if (isConventionalCommit(curr.commitMessage)) {
      if (isConventionalCommit(acc[acc.length - 1].changelogMessage)) {
        return [
          ...acc,
          {
            changelogMessage: curr.commitMessage,
            commitHashes: [curr.commitHash],
          },
        ]
      }
      else {
        return [
          ...acc.slice(0, acc.length - 1),
          {
            changelogMessage: curr.commitMessage,
            commitHashes: [...acc[acc.length - 1].commitHashes, curr.commitHash],
          },
        ]
      }
    }
    else {
      return [
        ...acc.slice(0, acc.length - 1),
        {
          ...acc[acc.length - 1],
          commitHashes: [...acc[acc.length - 1].commitHashes, curr.commitHash],
        },
      ]
    }
  }, [] as ConventionalMessagesToCommits[])
}

export function getFilesChangedSince(opts: { from: string; to: string }) {
  return execSync(`git diff --name-only ${opts.from}~1...${opts.to}`).toString().trim().split('\n')
}

export function getRepoRoot() {
  return execSync('git rev-parse --show-toplevel').toString().trim().replace(/\n|\r/g, '')
}

export function conventionalMessagesWithCommitsToChangesets(
  conventionalMessagesToCommits: ConventionalMessagesToCommits[],
  options: { ignoredFiles?: (string | RegExp)[]; packages: ManyPkgPackage[] },
) {
  const { ignoredFiles = [], packages } = options
  return conventionalMessagesToCommits
    .map((entry) => {
      const filesChanged = getFilesChangedSince({
        from: entry.commitHashes[0],
        to: entry.commitHashes[entry.commitHashes.length - 1],
      }).filter((file) => {
        return ignoredFiles.every((ignoredPattern) => !file.match(ignoredPattern))
      })

      const repoRoot = getRepoRoot().replace(/\\/g, '/')
      const packagesChanged = packages.filter((pkg) => {
        const pkgDir = pkg.dir.replace(/\\/g, '/').replace(`${repoRoot}/`, '')
        return filesChanged.some((file) => file.match(pkgDir))
      })
      console.log(
        `${entry.commitHashes[entry.commitHashes.length - 1]}  packagesChanged`,
        packagesChanged?.map((pkg) => pkg.packageJson.name),
      )
      if (packagesChanged.length === 0) {
        return null
      }
      return {
        releases: packagesChanged.map((pkg) => {
          return {
            name: pkg.packageJson.name,
            type: isBreakingChange(entry.changelogMessage) ? 'major' : entry.changelogMessage.startsWith('feat') ? 'minor' : 'patch',
          }
        }),
        summary: entry.changelogMessage,
        packagesChanged,
      }
    })
    .filter(Boolean) as Changeset[]
}

export function gitFetch(branch: string) {
  execSync(`git fetch origin ${branch}`)
}

export function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim().replace(/\n|\r/g, '')
}

// This could be running on the main branch or on a branch that was created from the main branch.
// If this is running on the main branch, we want to get all commits since the last release.
// If this is running on a branch that was created from the main branch, we want to get all commits since the branch was created.
export function getCommitsSinceRef(branch: string) {
  gitFetch(branch)
  const currentBranch = getCurrentBranch()
  let sinceRef = `origin/${branch}`
  if (currentBranch === branch) {
    try {
      sinceRef = execSync('git describe --tags --abbrev=0').toString().trim().replace(/\n|\r/g, '')
    }
    catch (e) {
      console.log(`No git tags found, using repo's first commit for automated change detection. Note: this may take a while.`, e)
      sinceRef = execSync('git rev-list --max-parents=0 HEAD').toString().trim().replace(/\n|\r/g, '')
    }
  }
  return execSync(`git rev-list --ancestry-path ${sinceRef}...HEAD`).toString().split('\n').filter(Boolean).reverse()
}

function compareChangeSet(a: Changeset, b: Changeset): boolean {
  return a.summary === b.summary && JSON.stringify(a.releases) === JSON.stringify(b.releases)
}

export function difference(a: Changeset[], b: Changeset[]): Changeset[] {
  return a.filter((changeA) => !b.some((changeB) => compareChangeSet(changeA, changeB)))
}

const CHANGESET_CONFIG_LOCATION = path.join('.changeset', 'config.json')

async function conventionalCommitChangeset(cwd: string = process.cwd(), options: { ignoredFiles: (string | RegExp)[] } = { ignoredFiles: [] }) {
  const packages = getPackagesSync(cwd).packages.filter((pkg) => !pkg.packageJson.private && Boolean(pkg.packageJson.version))
  const changesetConfig = JSON.parse(fs.readFileSync(path.join(cwd, CHANGESET_CONFIG_LOCATION)).toString())
  const { baseBranch = 'main' } = changesetConfig

  const commitsSinceBase = getCommitsSinceRef(baseBranch)

  const commitsWithMessages = commitsSinceBase.map((commitHash) => ({
    commitHash,
    commitMessage: execSync(`git log -n 1 --pretty=format:%s ${commitHash}`).toString(),
  }))

  const changelogMessagesWithAssociatedCommits = associateCommitsToConventionalCommitMessages(commitsWithMessages)

  const changesets = conventionalMessagesWithCommitsToChangesets(changelogMessagesWithAssociatedCommits, {
    ignoredFiles: options.ignoredFiles,
    packages,
  })

  const currentChangesets = await readChangeset(cwd)

  const newChangesets = currentChangesets.length === 0 ? changesets : difference(changesets, currentChangesets)

  newChangesets.forEach((changeset) => writeChangeset(changeset, cwd))
}

export function runChangesets() {
  conventionalCommitChangeset()
}

export function run() {
  const program = new Command('changesets').action(() => runChangesets())

  program.parse()
}
