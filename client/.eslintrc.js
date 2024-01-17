module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'airbnb-typescript',
        'next',
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-magic-numbers': [
            'warn',
            {
                ignore: [-1, 0, 1],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: false,
            },
        ],
        'consistent-return': 'warn',
        'react/no-danger': 'error',
        'max-len': ['warn', { code: 120, ignorePattern: 'className=".*"' }],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true }],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
        'react-hooks/exhaustive-deps': [
            'warn',
            {
                additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
            },
        ],
        '@typescript-eslint/no-empty-interface': 'off',
        'react/prop-types': 'off', // TS is handling this
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/*.stories.tsx'],
            },
        ],
        'no-console': [
            'error',
            {
                allow: ['error', 'warn'],
            },
        ],
        'import/extensions': 'off',
    },
    ignorePatterns: ['.eslintrc.js', 'next.config.js', 'postcss.config.js', 'tailwind.config.js'],
};
