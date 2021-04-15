module.exports = {
  root: true,
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-console': 'off',
    camelcase: 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
  },
  overrides: [{
    files: ['*ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
      ecmaversion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: false,
      },
    },
  }],
};
