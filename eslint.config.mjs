// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// If using Prettier, uncomment the next line after installing:
// import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Ignore build artifacts and coverage
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', '**/*.d.ts'],
  },

  // Base JS recommended rules
  eslint.configs.recommended,

  // TypeScript recommended + strict + stylistic rule sets
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,

  // Project-wide language options
  {
    languageOptions: {
      // Enable Node + Jest or other globals if needed
      globals: {
        ...globals.node,
      },
      // Parser set automatically by typescript-eslint in next config block
    },
  },

  // TypeScript-specific overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Point to your tsconfig for typed rules (optional but recommended)
        // Set "project" if enabling type-aware rules later
        // project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      // Reasonable TS rules adjustments
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    },
  },

  // JavaScript files (if any) without type-checking
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    // Disable TS type-checked configs on JS files
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // If using Prettier for formatting, enable plugin+config last:
  // prettierRecommended,
);
