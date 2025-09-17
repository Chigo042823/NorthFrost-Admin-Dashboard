import { defineConfig } from 'vite'
import * as path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
        alias: [
          { find: "@", replacement: path.resolve(__dirname, "src") },
          // You can add more aliases here, e.g.,
          // { find: "@components", replacement: path.resolve(__dirname, "src/components") },
        ],
      },
})
