import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          // Add other chunks as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed
  },
})
