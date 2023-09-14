// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    // 'primevue/resources/primevue.css',
    // 'primeicons/primeicons.css',
    // 'primeflex/primeflex.css',
    '~/assets/styles.scss',
  ],

  build: {
    transpile: ['primevue'],
  },

  ssr: false,
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
  ],
  piniaPersistedstate: {
    storage: 'localStorage',
  },

  googleFonts: {
    families: {
      Lato: true,
      Roboto: true,
      Nunito: [400, 500, 600, 700],
    },
  },
  imports: {
    dirs: [
      './middleware/**',
      'composables',
      'composables/*/index.{ts,js,mjs,mts}',
      './composables/**',
      './stores',
    ],
  },
  // If you want to auto-import components based only on its name, not path, then you need to set pathPrefix option to false using extended form of the configuration object
  components: [
    {
      path: '~/components', pathPrefix: true,
    },

  ],
  supabase: {
    redirectOptions: {
      login: '/auth/signin',
      callback: '/confirm',
    },
    clientOptions: {
      auth: {
        persistSession: true,
      },
    },
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  runtimeConfig: {
    // Public config
    public: {
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,

    },

  },

})
