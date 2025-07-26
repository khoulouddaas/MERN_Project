import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000', // backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
