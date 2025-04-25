const fs = require('fs');
const path = require('path');
const { subdirs } = require('./subdirs');

async function glob(pattern, cwd = process.cwd()) {
  const regex = globToRegex(pattern);
  const allPaths = await subdirs(cwd);

  return allPaths
      .map(fullPath => path.relative(cwd, fullPath))
      .filter(relativePath => regex.test(relativePath))
      .map(relativePath => path.join(cwd, relativePath));
}

function globToRegex(glob) {
  glob = glob.replaceAll('**', '|')
      .replaceAll('*', '[^/]*')
      .replaceAll('|', '.*');

  return new RegExp(`^${glob}$`);
}

module.exports = { glob };
