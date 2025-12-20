import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    globalIgnores(['*/build/', '*/dist/', '*/.*/', '_*/']),
    {
        files: ['*/src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
        rules: {
            'no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', args: 'none' },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', args: 'none' },
            ],
            '@typescript-eslint/ban-ts-comment': ['off'],
        },
    },
]);
