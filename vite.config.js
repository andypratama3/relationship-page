import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules\/(react|react-dom|react-is|use-sync-external-store)/ },
            { name: 'vendor-gsap', test: /node_modules\/(gsap)/ },
            { name: 'vendor-particles', test: /node_modules\/(@tsparticles|tsparticles)/ },
            { name: 'vendor-motion', test: /node_modules\/(lenis|canvas-confetti)/ },
          ],
        },
      },
    },
  },
})
