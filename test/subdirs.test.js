const { join } = require('node:path');
const { it, describe } = require('node:test');
const assert = require('node:assert/strict');

const { subdirs } = require('../src/subdirs'); // Adjust the path as needed

const fixturesDir = join(__dirname, 'fixtures');

describe('subdirs', () => {
  it('should return subdirectories recursively', async () => {
    const result = await subdirs(fixturesDir);
    const expected = [
      join(fixturesDir, 'a'),
      join(fixturesDir, 'a', 'A'),
      join(fixturesDir, 'a', 'B'),
      join(fixturesDir, 'b'),
      join(fixturesDir, 'b', 'A'),
      join(fixturesDir, 'b', 'B'),
      join(fixturesDir, 'c'),
      join(fixturesDir, 'c', 'A'),
      join(fixturesDir, 'c', 'A', 'x'),
      join(fixturesDir, 'c', 'A', 'x', 'A'),
      join(fixturesDir, 'c', 'A', 'x', 'B'),
    ];
    assert.deepEqual(result, expected);
  });
});
