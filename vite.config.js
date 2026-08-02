import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const REQUIRED_PRODUCTION_ENV = [
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_PUBLIC_KEY',
]

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (mode === 'production') {
    const missingVariables = REQUIRED_PRODUCTION_ENV.filter((name) => !env[name]?.trim())

    if (missingVariables.length > 0) {
      throw new Error(`Missing production environment variables: ${missingVariables.join(', ')}`)
    }
  }

  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  }
})
