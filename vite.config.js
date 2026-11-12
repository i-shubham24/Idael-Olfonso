import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Libraries change rarely, so they get their own long-cached files.
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion-core'
          if (/node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/.test(id)) return 'react'
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion'
        },
      },
    },
  },
})
