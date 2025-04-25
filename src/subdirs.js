const { join } = require('node:path');
const { existsSync } = require('node:fs');
const { readdir } = require('node:fs').promises;

async function subdirs(dir) {
  if (!existsSync(dir)) return [];
  const children = (await readdir(dir, { withFileTypes: true }))
      .filter(child => child.isDirectory() && !child.name.startsWith('.'));
  return (await Promise.all(
      children.map(async child => {
        const childPath = join(dir, child.name);
        const descendants = await subdirs(childPath);
        return [childPath, ...descendants];
      })
  )).flat();
}

module.exports = { subdirs };
