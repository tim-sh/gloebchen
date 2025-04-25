const { join } = require('node:path');
const { existsSync } = require('node:fs');
const { readdir } = require('node:fs').promises;

async function subdirs(dir) {
  if (!existsSync(dir)) return [];
  const dirents = (await readdir(dir, { withFileTypes: true }))
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'));
  const all = await Promise.all(
      dirents.map(async entry => {
        const fullPath = join(dir, entry.name);
        return [fullPath, ...(await subdirs(fullPath))];
      })
  );
  return all.flat();
}

module.exports = { subdirs };
