module.exports = {
  plugins: [
    '@semantic-release/npm',
    ['@semantic-release/git', { assets: ['package.json', 'CHANGELOG.md', 'README.md', 'docs'] }],
  ],
};
