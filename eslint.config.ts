/// <reference types="node" />

import js from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import i18next from 'eslint-plugin-i18next'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    globalIgnores(['dist', 'node_modules', 'src/generated-services']),
    {
        files: ['*.config.ts'],
        extends: [js.configs.recommended, tseslint.configs.strict],
    },
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.strictTypeChecked,
            eslintReact.configs['strict-type-checked'],
        ],
        languageOptions: {
            globals: globals.browser,
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: "MemberExpression[object.name='allAuthenticationScopes']",
                    message: 'Use the string literal instead.',
                },
            ],
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/consistent-indexed-object-style': 'error',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'no-public',
                },
            ],
            '@typescript-eslint/no-confusing-non-null-assertion': 'error',
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/no-dynamic-delete': 'off',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/non-nullable-type-assertion-style': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-regexp-exec': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/prefer-ts-expect-error': 'error',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/restrict-plus-operands': [
                'error',
                {
                    allowAny: true,
                    allowBoolean: true,
                    allowNullish: true,
                    allowNumberAndString: true,
                    allowRegExp: true,
                },
            ],
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowAny: true,
                    allowBoolean: true,
                    allowNullish: true,
                    allowNumber: true,
                    allowRegExp: true,
                },
            ],
            '@typescript-eslint/sort-type-constituents': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@stylistic/jsx-curly-brace-presence': 'error',
            '@stylistic/jsx-self-closing-comp': 'error',
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { 'simple-import-sort': simpleImportSort },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    i18next.configs['flat/recommended'],
    eslintConfigPrettier,
])
