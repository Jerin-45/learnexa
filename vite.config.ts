import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'html-entry-transform',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html
            .replace(
              /<script type="module" crossorigin src="\.\/assets\/index\.js"><\/script>/,
              '<script type="module" src="/src/main.tsx"></script>'
            )
            .replace(
              /<link rel="stylesheet" crossorigin href="\.\/assets\/index\.css">/,
              ''
            );
        },
      },
    },
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});


