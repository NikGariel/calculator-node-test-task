// @ts-nocheck
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintConfigAirbnb from 'eslint-config-airbnb-base';
import jest from 'eslint-plugin-jest';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            prettier: pluginPrettier,
            jest: jest,
        },
        rules: {
            'no-console': 'off', // Разрешить использование console.log
            'prettier/prettier': 'error', // Вызывать ошибку для нарушений Prettier
            ...eslintConfigAirbnb.rules, // Интеграция правил Airbnb
        },
    },
    pluginJs.configs.recommended,
    {
        files: ['**/*.test.js', '**/*.spec.js'],
        ...jest.configs['flat/recommended'],
        rules: {
            ...jest.configs['flat/recommended'].rules,
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
        },
    },
];
