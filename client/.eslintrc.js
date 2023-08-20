module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: ['eslint:recommended', 'airbnb-typescript', 'next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', {
      additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)'
    }],
    '@typescript-eslint/no-empty-interface': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'react/jsx-uses-react': 'off',
    '@next/next/no-document-import-in-page': 'off',
    '@next/next/no-img-element': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['.storybook/**', '**/*.stories.tsx']
    }],
    'no-console': ['error', {
      allow: ['error', 'warn']
    }],
    'import/extensions': 'off'
  },
  ignorePatterns: ['.eslintrc.js', 'next.config.js', 'apollo.config.js', 'postcss.config.js', 'tailwind.config.js']
};