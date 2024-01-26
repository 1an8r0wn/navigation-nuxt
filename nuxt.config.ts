// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  ui: {
    icons: ['mdi'],
  },
  modules: [
    'nuxt-security',
    '@nuxt/ui',
    '@nuxt/image',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },
  dayjs: {
    locales: ['zh-cn', 'en'],
    plugins: ['isBetween', 'relativeTime', 'utc', 'timezone'],
    defaultLocale: 'zh-cn',
  },
  runtimeConfig: {
    public: {
      socketPort: 3001,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-cn',
      },
      charset: 'utf-8',
    },
  },
})
