// examples/demo-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@specview/core': path.resolve(__dirname, '../../packages/core'),
      '@specview/react': path.resolve(__dirname, '../../packages/react'),
      '@specview/components': path.resolve(__dirname, '../../packages/components'),
      '@specview/export-utils': path.resolve(__dirname, '../../packages/export-utils')
    }
  }
});