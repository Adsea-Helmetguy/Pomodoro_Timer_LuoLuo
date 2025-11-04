import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/PomodoroTimer_Beta.github.io/",
  plugins: [
    tailwindcss(),
  ],
});