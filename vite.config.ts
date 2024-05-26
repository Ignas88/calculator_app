import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@commons': path.resolve(__dirname, './src/commons'),
    },
  },
  plugins: [vue()],
});
