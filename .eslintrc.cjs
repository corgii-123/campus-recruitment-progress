module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  ignorePatterns: [
    '/**/*.json',
    'src/**/*.test.js',
    '/node_modules/*',
    '/**/*.html',
    '/**/*.md'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: 0,
    'import/no-extraneous-dependencies': 0,
    'implicit-arrow-linebreak': 0,
    'no-plusplus': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'no-nested-ternary': 0,
    indent: 0
  }
}
