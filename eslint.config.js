// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Core ---
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// --- React ---
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------
// [TRAP] ESLint 9 loads this file before eslint.config.mts, so edits to the .mts file do nothing
export default tseslint.config(
  // --- Ignores ---
  // .claude holds Workflow scripts - the runtime wraps them in an async function, so top-level return/await is valid there
  // [id] needs escaped brackets - unescaped, the glob reads it as "one character: i or d"
  {
    ignores: [
      'dist',
      '.claude',
      '_meta',
      '_ref',
      'src/app/foods/\\[id\\]/page.tsx',
      'src/app/foods/page_client_side.tsx',
    ],
  },

  // --- TypeScript And React Files ---
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Hot reload keeps component state only when a file exports components (constants allowed)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // @ts-nocheck is allowed only with a reason, e.g. "// @ts-nocheck : JS compatible" - a bare one still fails
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': 'allow-with-description' }],
    },
  },
);
