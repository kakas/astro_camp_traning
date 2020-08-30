module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/babel',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: ['public/packs/js/*.js'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['app/javascript/src'],
      },
    },
  },
}
