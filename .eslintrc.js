module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react-native/all',
    '@react-native',
    'airbnb-base',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: ['prettier', '@typescript-eslint', 'jest'],
  rules: {
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
        unnamedComponents: ['function-expression', 'arrow-function']
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-const': 'error',
    'no-import-assign': 'error',
    'no-self-assign': 'error',
    'jsx-quotes': ['error', 'prefer-double'],
    'no-restricted-exports': 'off',
    'import/extensions': 'off',
    'array-callback-return': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'react/display-name': 'off',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react/no-unstable-nested-components": "off"
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', 'lib/', 'coverage/', 'build/']
}