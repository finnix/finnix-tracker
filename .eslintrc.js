module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'quote-props': ['error', 'consistent-as-needed'],
    'comma-dangle': ['error', 'only-multiline']
  }
}
