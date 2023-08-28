/* eslint-disable n/prefer-global/process */
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
  ],

  build: {
    transpile: ['primevue'],
  },

  ssr: false,
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

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
      callback: '/confirm'
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
