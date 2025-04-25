const { it, describe } = require('node:test');
const assert = require('node:assert/strict');

const { glob } = require('../src/glob');
const { join } = require('node:path'); // Adjust the path as needed

const fixturesDir = join(__dirname, 'fixtures');

describe('glob', () => {
  it('should match dirs with single asterisk', async () => {
    const result = await glob('*/A', fixturesDir);
    const expected = [
      join(fixturesDir, 'a', 'A'),
      join(fixturesDir, 'b', 'A'),
    ];
    assert.deepEqual(result, expected);
  });

  it('should match dirs with double asterisk', async () => {
    const result = await glob('**/A', fixturesDir);
    const expected = [
      join(fixturesDir, 'a', 'A'),
      join(fixturesDir, 'b', 'A'),
    ];
    assert.deepEqual(result, expected);
  });

});