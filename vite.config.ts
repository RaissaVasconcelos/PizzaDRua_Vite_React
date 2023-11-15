import { defineConfig, loadEnv } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), legacy()],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "./src/assets/*"),
        "@components": path.resolve(__dirname, "./src/components/*"),
        "@context": path.resolve(__dirname, "./src/context/*"),
        "@globais": path.resolve(__dirname, "./src/globais/*"),
        "@hooks": path.resolve(__dirname, "./src/hooks/*"),
        "@infrastructure": path.resolve(__dirname, "./src/infrastructure/*"),
        "@layouts": path.resolve(__dirname, "./src/layouts/*"),
        "@model": path.resolve(__dirname, "./src/model/*"),
        "@pages": path.resolve(__dirname, "./src/pages/*"),
        "@services": path.resolve(__dirname, "./src/services/*"),
        "@utils": path.resolve(__dirname, "./src/utils/*"),
      },
    },
  })
}
