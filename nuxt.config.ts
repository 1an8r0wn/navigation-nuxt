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
    '@element-plus/nuxt',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  security: {
    headers: {
      // eslint-disable-next-line node/prefer-global/process
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
      baiduAPI: '',
      socketPort: 3001,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-cn',
      },
      charset: 'utf-8',
      // 引入百度统计代码，具体 API 值请前往 .env 的 NUXT_PUBLIC_BAIDU_API 进行编辑
      // eslint-disable-next-line node/prefer-global/process
      script: [{ src: `https://hm.baidu.com/hm.js?${process.env.BAIDU_TONGJI_API}` }],
    },
  },
})
