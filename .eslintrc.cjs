module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "@nuxtjs/eslint-config-typescript",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    // eslint-import-resolver-typescript는 tsconfig에서 path alias를 사용할 수 있도록 해주는 패키지다
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-alert": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "prefer-const": "off",
    "no-restricted-syntax": "off",
    "import/prefer-default-export": [
      "off",
      { target: "single" }, // default is "single"
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
        mjs: "never",
        jsx: "never",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
