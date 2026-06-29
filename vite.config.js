import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/.test(id)) return 'react';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('lucide-react')) return 'icons';
          if (
            id.includes('@shadergradient') ||
            id.includes('@react-three') ||
            id.includes('three') ||
            id.includes('three-stdlib') ||
            id.includes('camera-controls')
          ) {
            return 'shader';
          }
          return 'vendor';
        },
      },
    },
  },
})
