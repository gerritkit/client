module.exports = {
    extends: [
      'eslint-config-qiwi',
      'prettier'
    ],
    overrides: [{
      files: ['./src/**/*.ts'],
      rules: {
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-null': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'camelcase': 'off',
        'simple-import-sort/imports': 'off',
        'no-template-curly-in-string': 'off',
        'unicorn/escape-case': 'off',
        'sonarjs/no-nested-template-literals': 'off'
      },
    }]
  };
  