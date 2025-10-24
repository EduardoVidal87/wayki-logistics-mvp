import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wayki-logistics-mvp/'   // necesario para GitHub Pages
})
