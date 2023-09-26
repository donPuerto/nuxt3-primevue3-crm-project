// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  ssr: false,
  app: {
    head: {
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/theme/theme-light/indigo/theme.css' },
      ],
    },
  },
  css: [
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    // 'prismjs/themes/prism-coy.css',
    '@/assets/styles.scss',
  ],
  build: {
    transpile: ['primevue'],
  },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    // Private config that is only available on the server
    public: {
      // Config within public will be also exposed to the client
      // eslint-disable-next-line node/prefer-global/process
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  // supabase Options
  supabase: {
    // Options
  },
  pinia: {
    autoImports: [
      // import { defineStore as definePiniaStore } from 'pinia'
      ['defineStore', 'definePiniaStore'],
    ],
  },
  // Pinia global options
  piniaPersistedstate: {
    storage: 'localStorage',
  },
})
