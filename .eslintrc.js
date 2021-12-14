module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['google', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'spellcheck'],
  overrides: [
    {
      files: ['dist/**/*'],
      rules: {
        'no-var': 'off',
        'spellcheck/spell-checker': ['off'],
        'no-invalid-this': ['off'],
        'no-unused-vars': ['off'],
        'prefer-const': ['off'],
        'prefer-rest-params': ['off'],
        'prefer-spread': ['off'],
      },
    },
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'require-jsdoc': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-array-constructor': 'off',
    'spellcheck/spell-checker': [
      'warn',
      {
        skipWords: [
          'ecma',
          'jsdoc',
          'koconut',
          'enum',
          'stdin',
          'stdout',
          'stderr',
          'cmd',
          'rst',
          'promisified',
          'unlink',
          'splitted',
          'utf',
          'argv',
          'readdir',
          'rmdir',
          'num',
          'yieldable',
          'eql',
          'eqls',
          'Jinyoung',
          'Luvya',
          'abc',
          'abcd',
          'bc',
          'aaa',
          'bbbb',
          'dcba',
          'abcdefg',
          'de',
          'ghi',
          'jkl',
          'acc',
          'wa',
          'wab',
          'wabc',
          'wabcd',
          'accessor',
          'bisquit',
          'colour',
          'english',
          'japanese',
          'korean',
          'ja',
          'ko',
          'predicator',
          'str',
          'comparator',
          'nullable',
          'xnor',
          'eqv',
          'nand',
          'versa',
          'stringified',
          'webpack',
        ],
      },
    ],
  },
};
