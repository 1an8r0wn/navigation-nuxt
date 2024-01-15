// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],
  ui: {
    icons: ['mdi'],
  },
  modules: [
    '@nuxt/ui',
  ],
})
