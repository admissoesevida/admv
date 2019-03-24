module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['sort-imports-es6-autofix', 'prettier'],
  rules: {
    'spaced-comment': ['error', 'always', { line: { exceptions: ['-'] } }],
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    semi: ['error', 'always'],
    'prettier/prettier': ['error', { singleQuote: true }],
    indent: [
      'error',
      2,
      { ArrayExpression: 1, MemberExpression: 1, ObjectExpression: 1 }
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false
      }
    ]
  }
};
