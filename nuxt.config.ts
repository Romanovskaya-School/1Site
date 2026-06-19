// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/seo'
  ],
  site: {
    url: 'https://viktoriaterekhova.ru',
    name: 'Виктория Терехова — Психолог | Онлайн-консультации',
    description: 'Бережная психологическая помощь онлайн.',
    defaultLocale: 'ru', 
  },
  routeRules: {
    '/admin': { robots: false }
  },
  css: ['~/assets/main.css'],
  devtools: { enabled: true }
})
