import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      config: './postcss.config.cjs', // Assure-toi que le chemin est correct
    },
  },
});