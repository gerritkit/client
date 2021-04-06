module.exports = {
  extends: [
    'eslint-config-qiwi',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'camelcase': 'off',
    'no-template-curly-in-string': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'no-useless-escape': 'off',
    'sonarjs/no-duplicate-string': 'off'
  },
};
