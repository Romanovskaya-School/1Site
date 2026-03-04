import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const CONTENT_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'content.json')

function ensureContentFile() {
  if (!existsSync(CONTENT_PATH)) {
    writeFileSync(CONTENT_PATH, '{}', 'utf8')
    console.log('[vite] Создан content.json для CMS')
  }
}

// Плагин: API CMS прямо в dev-сервере (не нужен отдельный server на 3000)
function cmsApiPlugin() {
  return {
    name: 'cms-api',
    configureServer(server) {
      server.middlewares.use('/api/content', (req, res, next) => {
        if (req.url !== '/' && req.url !== '') return next()
        res.setHeader('Content-Type', 'application/json')

        if (req.method === 'GET') {
          try {
            ensureContentFile()
            const data = readFileSync(CONTENT_PATH, 'utf8')
            const json = JSON.parse(data || '{}')
            res.statusCode = 200
            res.end(JSON.stringify(json))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Cannot read content file' }))
          }
          return
        }

        if (req.method === 'PUT') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}')
              if (typeof parsed !== 'object' || Array.isArray(parsed)) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Content must be an object' }))
                return
              }
              ensureContentFile()
              writeFileSync(CONTENT_PATH, JSON.stringify(parsed, null, 2), 'utf8')
              res.statusCode = 200
              res.end(JSON.stringify({ ok: true }))
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Cannot write content file' }))
            }
          })
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: '/Applications/WebStorm.app/Contents/MacOS/webstorm'
    }),
    cmsApiPlugin(),
  ],
  server: {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
  },
})
