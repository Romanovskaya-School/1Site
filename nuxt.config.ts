// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            // Set with NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_KEY.
            // These values are intentionally public: RLS protects the data.
            supabaseUrl: 'https://nxovddootvbvrmkdyccq.supabase.co',
            supabaseKey: 'sb_publishable_P_Ug0PJpbCFJyD3eznhGzA_UKNJ_Hl1',
        },
    },
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
        '/dashboard/**': {robots: false}
    },
    css: ['~/assets/main.css'],
    devtools: {enabled: true}
})
