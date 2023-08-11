import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   exclude: ['js-big-decimal']
  // },
  resolve: {
    alias: {
      "@/": path.join(__dirname, "src/")
    }
  }
})
