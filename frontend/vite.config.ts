import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      // If you later want to proxy ws as well, keep this ready
      // '/ws': {
      // 	target: 'http://localhost:8081',
      // 	ws: true,
      // },
    },
  },
});
