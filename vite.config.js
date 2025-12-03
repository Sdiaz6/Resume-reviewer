import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'chart-vendor': ['recharts'],
          'pdf-vendor': ['pdfjs-dist'],
          'ui-vendor': ['html2canvas', 'jspdf', 'react-to-print']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})
