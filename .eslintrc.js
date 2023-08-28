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
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off',

  },
  globals: {
    'defineNuxtConfig': 'readonly',
    'defineNuxtPlugin': 'readonly',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
