module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-useless-escape": "off",
    "prefer-const": "error",
    "class-methods-use-this": "off",
    camelcase: "off",
  },
};
