/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
  },
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['e2e/**', 'node_modules/**', '.claude/**'],
  },
});
