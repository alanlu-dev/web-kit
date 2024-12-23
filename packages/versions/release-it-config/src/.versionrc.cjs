module.exports = {
  // https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md#type
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'docs', section: '📝 Documentation' },
    { type: 'style', section: '💄 Styles' },
    { type: 'refactor', section: '🔨 Code Refactoring' },
    { type: 'perf', section: '🚀 Performance Improvements' },
    { type: 'test', section: '🧪 Tests' },
    { type: 'build', section: '👷 Build System', hidden: true },
    { type: 'ci', section: '🔧 Continuous Integration', hidden: true },
    { type: 'chore', scope: 'release', hidden: true },
    { type: 'chore', section: '🧹 Miscellaneous Chores' },
    { type: 'revert', section: '⏪️ Reverts' },
  ],
}
