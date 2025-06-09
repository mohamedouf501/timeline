module.exports = {
  branches: ['main'], // or ['main', 'next'] depending on your branching
  plugins: [
    '@semantic-release/commit-analyzer', // analyzes commit messages
    '@semantic-release/release-notes-generator', // generates changelog
    '@semantic-release/github', // creates GitHub release
    [
      '@semantic-release/git', // commits changelog + version
      {
        assets: ['CHANGELOG.md', 'version.txt'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
