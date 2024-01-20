// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  ui: {
    icons: ['mdi'],
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
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
