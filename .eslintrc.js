module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-var': 2,
    'no-empty': 2,
    'no-undef': 0,
    'no-shadow': 0,
    'no-console': 0,
    'valid-jsdoc': 0,
    'dot-notation': 0,
    'no-extra-semi': 2,
    'no-unused-vars': 1,
    'consistent-return': 0,
    'no-use-before-define': 2,
    'no-async-promise-executor': 0,
    'max-len': [0, 150],
    'linebreak-style': ['error', 'unix'],
    'no-cond-assign': ['error', 'always'],
    'no-param-reassign': [
      0,
      {
        props: false,
      },
    ],
    radix: ['error', 'as-needed'],
    eqeqeq: 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    camelcase: [
      0,
      {
        ignoreGlobals: true,
      },
    ],
  },
};
