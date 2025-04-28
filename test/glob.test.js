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
      'c/A/xyz/A'
    ];
    assert.deepEqual(result, expected);
  });

  it('should match dirs with question mark', async () => {
    const result = await globArray('c/?/x?z/*', { cwd: fixturesDir });
    const expected = [
      'c/A/xyz/A',
      'c/A/xyz/B'
    ];
    assert.deepEqual(result, expected);
  });

  it('should match dirs with char set', async () => {
    const result = await globArray('c/A/x[yab]z/*', { cwd: fixturesDir });
    const expected = [
      'c/A/xyz/A',
      'c/A/xyz/B'
    ];
    assert.deepEqual(result, expected);
  });

  it('should match dirs with negative char set', async () => {
    const result = await globArray('c/[!B-Z]/**', { cwd: fixturesDir });
    const expected = [
      'c/A/xyz',
      'c/A/xyz/A',
      'c/A/xyz/B'
    ];
    assert.deepEqual(result, expected);
  });

  describe('combinations', () => {
    it('should match dirs with combination of wildcards', async () => {
      const result = await globArray('[!bar]/?/**', { cwd: fixturesDir });
      const expected = [
        'c/A/xyz',
        'c/A/xyz/A',
        'c/A/xyz/B'
      ];
      assert.deepEqual(result, expected);
    });
  });

});