// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: true, // enable stylistic formatting rules
    typescript: true,
    vue: true,
    jsonc: false,
    yml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
      './fixtures',
      // ...globs
    ],
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
      'vue/no-unused-vars': ['error', {
        ignorePattern: '^_',
      }],
      'vue/order-in-components': ['error', {
        order: [
          'script',
          'template',
          'style',
        ],
      }],
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'never'],
    },
  },
)
