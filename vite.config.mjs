// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'app/template/default/page/html/index.html'),
        models: path.resolve(__dirname, 'app/template/default/page/html/models.html'),
        Error404: path.resolve(__dirname, 'app/template/default/page/html/404.html'),
        Error500: path.resolve(__dirname, 'app/template/default/page/html/500.html')
      }
    }
  }
});