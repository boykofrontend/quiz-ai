import js from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'public/**'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/forbid-prop-types': 'off',
      'react/no-danger': 'off',
      'react/button-has-type': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // JSX A11y
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],

      // Import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external' },
            { pattern: 'next-intl', group: 'external', position: 'after' },
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next/**', 'next-intl', '@/**'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: false,
        },
      ],
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-named-as-default': 'off',

      // General
      camelcase: 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'no-dupe-keys': 'warn',
      'no-unused-vars': 'off',
      'no-console': ['warn', { allow: ['error', 'info'] }],
      'no-debugger': 'warn',
      'linebreak-style': 'off',
      'func-style': ['error', 'expression'],
      'max-len': [
        'warn',
        { code: 120, tabWidth: 2, ignoreUrls: true, ignoreComments: true, ignoreStrings: true },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],
    },
  },

  configPrettier,

  {
    plugins: { prettier: pluginPrettier },
    rules: { 'prettier/prettier': 'error' },
  },
];
