import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/Pomodoro_Timer_LuoLuo/",
  plugins: [
    tailwindcss(),
  ],
});