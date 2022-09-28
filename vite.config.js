import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import eslintPlugin from 'vite-plugin-eslint' //导入包

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      //指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      //指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  //代理配置
  server: {
    proxy: {
      // 代理所有 /api 的请求，该求情将被代理到 target 中
      // '/api': {
      //   // 代理请求之后的请求地址
      //   target: '',
      //   // 跨域
      //   changeOrigin: true
      // }
    }
  }
})
