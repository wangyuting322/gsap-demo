import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      imports: ['vue'] // 自动引入vue、vue-router、pinia
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/assets/style/global.scss" as *;`
      }
    }
  }
})
