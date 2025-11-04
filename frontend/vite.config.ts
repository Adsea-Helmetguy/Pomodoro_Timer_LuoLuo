import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/PomodoroTimerBeta-app/",
  plugins: [
    tailwindcss(),
  ],
});