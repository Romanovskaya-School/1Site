import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
      vue(),
    VueDevTools({
      launchEditor: 'webstorm',
    }),
  ],
  server: {
    allowedHosts: true
  }
})
