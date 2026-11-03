import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Same alias as waku.config.ts and tsconfig.json
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  test: {
    exclude: [
      ...configDefaults.exclude,
      // Claude Code worktrees hold full copies of the repo
      '.claude/**',
      // Live API tests need network access and credentials, so they only run with `pnpm test:live`
      ...(process.env.LIVE_TESTS ? [] : ['**/*.live.test.ts']),
    ],
  },
});
