import { defineConfig } from 'vitest/config';
import { offline } from './offline';

export default defineConfig({
  plugins: [offline()],
  test: { environment: 'node' },
});
