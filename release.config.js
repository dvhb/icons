module.exports = {
  plugins: [['@semantic-release/git', { assets: ['package.json', 'CHANGELOG.md', 'README.md', 'docs'] }]],
};
