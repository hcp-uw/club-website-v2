import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile';
import tailwindcss from '@tailwindcss/vite'

let plugins = [react(), viteSingleFile()]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isVergil = mode === 'vergil';

  return {
    plugins: [
      tailwindcss(),
    ],
    base: isVergil ? '/hcpuw/' : '/',
    define: {
      'import.meta.env.VITE_USE_HASH_ROUTER': isVergil,
    },
  };
})