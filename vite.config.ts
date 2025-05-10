import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'caloriebomb-react.local',
      'localhost'
    ],
    hmr: {
      protocol: 'ws',
      host: process.env.HMR_HOST || 'caloriebomb-react.local', // Change this to your LAN-accessible hostname
      port: process.env.HMR_PORT ? Number(process.env.HMR_PORT) : 5173,
    },
  }
})
