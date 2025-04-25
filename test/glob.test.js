const { it, describe } = require('node:test');
const assert = require('node:assert/strict');

const { globArray } = require('../src/glob');
const { join } = require('node:path'); // Adjust the path as needed

const fixturesDir = join(__dirname, 'fixtures');

describe('glob', () => {
  it('should match dirs with single asterisk', async () => {
    const result = await globArray('*/A', { cwd: fixturesDir });
    const expected = [
      'a/A',
      'b/A',
      'c/A'
    ];
    assert.deepEqual(result, expected);
  });

  it('should match dirs with double asterisk', async () => {
    const result = await globArray('**/A', { cwd: fixturesDir });
    const expected = [
      'a/A',
      'b/A',
      'c/A',
      'c/A/x/A'
    ];
    assert.deepEqual(result, expected);
  });

});