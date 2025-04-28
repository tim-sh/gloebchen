/**
 * Converts a glob pattern to a regular expression.
 * Supports the following wildcards: `? * ** [...] [!...]`.
 * Patterns such as `./foo` are normalized to `foo`.
 * @param glob - The glob pattern to convert.
 * @returns {RegExp} - The regular expression that matches the glob pattern.
 */
function globToRegex(glob) {
  glob = glob
      .replace(/^\.\//, '')
      .replaceAll('**', '|')
      .replaceAll(/\[!([^\]]+)]/g, '[^$1]')
      .replaceAll('?', '[^/]')
      .replaceAll('*', '[^/]*')
      .replaceAll('|', '.*');

  return new RegExp(`^${glob}$`);
}

module.exports = { globToRegex };