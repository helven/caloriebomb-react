import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { networkInterfaces } from 'os';

const getLocalIP = () => {
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        const ip = net.address;
        // Return first local network IP (skip VPN)
        if (ip.startsWith('192.168.') || ip.startsWith('10.')) {
          return ip;
        }
      }
    }
  }
  
  return 'localhost';
};
const localIP = getLocalIP();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  //server: {
  //  host: '0.0.0.0',
  //  port: 5173,
  //  allowedHosts: [
  //    'caloriebomb-react.test',
  //    'localhost'
  //  ],
  //  hmr: {
  //    protocol: 'ws',
  //    host: process.env.HMR_HOST || 'caloriebomb-react.test', // Change this to your LAN-accessible hostname
  //    port: process.env.HMR_PORT ? Number(process.env.HMR_PORT) : 5173,
  //  },
  //}
  ...(process.env.NODE_ENV === 'development' && { // Only apply server config in dev mode
    server: {
      host: '0.0.0.0',
      port: process.env.HMR_PORT ? Number(process.env.HMR_PORT) : 5174,
        allowedHosts: [
          'caloriebomb-react.test',
          'localhost'
        ],
      hmr: {
        host: process.env.HMR_HOST || localIP, // Change this to your LAN-accessible hostname
        port: process.env.HMR_PORT ? Number(process.env.HMR_PORT) : 5174,
      },
    },
  }),
})
