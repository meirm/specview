// examples/demo-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map to the new published package names
      '@meirm/specview-core': resolve(__dirname, '../../packages/core'),
      '@meirm/specview-react': resolve(__dirname, '../../packages/react'),
      '@meirm/specview-components': resolve(__dirname, '../../packages/components'),
      '@meirm/specview-export-utils': resolve(__dirname, '../../packages/export-utils'),
      
      // Keep old aliases for backward compatibility during development
      '@specview/core': resolve(__dirname, '../../packages/core'),
      '@specview/react': resolve(__dirname, '../../packages/react'),
      '@specview/components': resolve(__dirname, '../../packages/components'),
      '@specview/export-utils': resolve(__dirname, '../../packages/export-utils')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});