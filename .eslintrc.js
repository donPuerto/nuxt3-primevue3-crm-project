const process = require('node:process')

process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,

  },
  extends: '@antfu',
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-return-assign': 'off',
    'no-tabs': 'off',
    'import/order': 'off',
    'import/no-named-as-default': 'off',
    'no-unused-expressions': 'off',

    'vue/no-v-html': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/no-template-shadow': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',

    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/eslint-disable-next-line no-undef': 'off',
    'n/prefer-global/process': 'off',

  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
    },
  ],
  // globals: {
  //   'defineNuxtConfig': 'readonly',
  //   'defineNuxtPlugin': 'readonly',
  //   '@typescript-eslint/ban-ts-comment': 'off',
  // },
}
