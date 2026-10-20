import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/agent',
  test: {
    name: '@org/agent',
    watch: false,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
  },
});
