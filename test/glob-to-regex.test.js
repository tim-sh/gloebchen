const { it, describe } = require('node:test');
const assert = require('node:assert/strict');

describe('glob-to-regex', () => {
  const { globToRegex } = require('../src/glob-to-regex');

  it('pattern starting with dot', () => {
    const testCases = [
      { glob: './a/B', expected: /^a\/B$/ },
      { glob: './a/B/C/D', expected: /^a\/B\/C\/D$/ }
    ];

    testCases.forEach(({ glob, expected }) => {
      const regex = globToRegex(glob);
      assert.strictEqual(regex.toString(), expected.toString());
    });
  });

  it('patterns without asterisks', () => {
    const testCases = [
      { glob: 'a/B', expected: /^a\/B$/ },
      { glob: 'a/B/C/D', expected: /^a\/B\/C\/D$/ }
    ];

    testCases.forEach(({ glob, expected }) => {
      const regex = globToRegex(glob);
      assert.strictEqual(regex.toString(), expected.toString());
    });
  });


  it('patterns starting with asterisks', () => {
    const testCases = [
      { glob: '*/A', expected: /^[^/]*\/A$/ },
      { glob: '**/A', expected: /^.*\/A$/ },
      { glob: '*/A/B', expected: /^[^/]*\/A\/B$/ },
      { glob: '**/A/B', expected: /^.*\/A\/B$/ },
      { glob: '**/A/B/*', expected: /^.*\/A\/B\/[^/]*$/ },
      { glob: '**/A/B/**', expected: /^.*\/A\/B\/.*$/ },
      { glob: '*/**/A', expected: /^[^/]*\/.*\/A$/ },
      { glob: '**/**/A', expected: /^.*\/.*\/A$/ },
      { glob: '*/**/A/B', expected: /^[^/]*\/.*\/A\/B$/ },
      { glob: '**/**/A/B', expected: /^.*\/.*\/A\/B$/ }
    ];

    testCases.forEach(({ glob, expected }) => {
      const regex = globToRegex(glob);
      assert.strictEqual(regex.toString(), expected.toString());
    });
  });

  it('patterns not starting with asterisks', () => {
    const testCases = [
      { glob: 'a/B', expected: /^a\/B$/ },
      { glob: 'a/*', expected: /^a\/[^/]*$/ },
      { glob: 'a/*/B', expected: /^a\/[^/]*\/B$/ },
      { glob: 'a/**', expected: /^a\/.*$/ },
      { glob: 'a/**/B', expected: /^a\/.*\/B$/ },
      { glob: 'a/B/C/D', expected: /^a\/B\/C\/D$/ },
      { glob: 'a/B/C/**/D', expected: /^a\/B\/C\/.*\/D$/ }
    ];

    testCases.forEach(({ glob, expected }) => {
      const regex = globToRegex(glob);
      assert.strictEqual(regex.toString(), expected.toString());
    });
  });
});
