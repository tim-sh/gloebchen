/**
 * Converts a glob pattern to a regular expression.
 * Supports single asterisk (`*`) and double asterisk (`**`) wildcards.
 * Patterns starting with `./` are normalized.
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