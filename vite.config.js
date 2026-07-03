import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base is /postmark/ only when building on GitHub Actions (Pages deploy)
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/postmark/' : '/',
  plugins: [react(), tailwindcss()],
})
