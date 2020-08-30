module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "prettier/react",
    "prettier/babel"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    semi: ["error", "never"]
  },
  ignorePatterns: ["public/packs/js/*.js"]
};
