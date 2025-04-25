const path = require('path');

const { subdirs } = require('./subdirs');
const { globToRegex } = require('./glob-to-regex');

/**
 * Returns only those subdirectories, recursively, that match the glob pattern.
 * @param pattern - The glob pattern to match against.
 * @param cwd - The current working directory to start the search from.
 * @returns {Promise<string[]>} - An array of relative paths that match the glob pattern.
 */
async function glob(pattern, { cwd } = { cwd: process.cwd() }) {
  const regex = globToRegex(pattern);
  const allPaths = await subdirs(cwd);

  return allPaths
      .map(fullPath => path.relative(cwd, fullPath))
      .filter(relativePath => regex.test(relativePath));
}

module.exports = { glob };
