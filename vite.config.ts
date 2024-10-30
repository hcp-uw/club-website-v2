import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile';

let plugins = [react(), viteSingleFile()]

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  base: '/'
})
