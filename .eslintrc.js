module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/explicit-member-accessibility': [
      1,
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'no-public',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit'
        }
      }
    ],
    '@typescript-eslint/member-ordering': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': [1, {functions: false}],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-floating-promises': [2, {ignoreVoid: true}],
    '@typescript-eslint/require-await': [2],
    'guard-for-in': 1
  },
  root: true,
  env: {
    node: true
  }
};
