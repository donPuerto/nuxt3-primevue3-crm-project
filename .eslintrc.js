const process = require('node:process')

process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  env: {
    browser: true,
    node: true,
    // nuxt: true,

  },
  extends: '@antfu',
  rules: {
    // ... other rules
    'no-tabs': 'off',
    'no-console': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',

  },
  globals: {
    'defineNuxtConfig': 'readonly',
    'defineNuxtPlugin': 'readonly',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
