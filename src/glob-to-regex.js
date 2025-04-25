function globToRegex(glob) {
  glob = glob
      .replace(/^\.\//, '')
      .replaceAll('**', '|')
      .replaceAll('*', '[^/]*')
      .replaceAll('|', '.*');

  return new RegExp(`^${glob}$`);
}

module.exports = { globToRegex };