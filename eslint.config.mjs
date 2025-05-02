// https://docs.expo.dev/guides/using-eslint/

import { fileURLToPath } from 'url';
import path from 'path';
import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  { ignores: ['/dist/*'] },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  compat.extends('eslint-config-expo'),
  reactPlugin.configs.flat['recommended'],
  reactPlugin.configs.flat['jsx-runtime'],
  {
    rules: {
      'react/jsx-boolean-value': 'off',
      'react/jsx-curly-brace-presence': 'error',
      'react/no-unknown-property': 'error',
      'react/prop-types': 'off', // handled by TypeScript
      'react/self-closing-comp': 'error',
    },
    settings: { react: { version: 'detect' } },
  },
  compat.extends('plugin:react-hooks/recommended'),
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'import/no-unresolved': 'off',
    },
  },
);
