import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the default port to 3000. IMPORTANT BECAUSE GOOGLE LOGIN USES THIS PORT!
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/api-docs': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/swagger.css': {
        target: 'http://localhost:4000',
      },
      '/pin_icon.png': {
        target: 'http://localhost:4000',
      },
    },
    open: true, // Automatically opens the browser
  },
});
