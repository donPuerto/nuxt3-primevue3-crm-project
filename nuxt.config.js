export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { "http-equiv": "x-ua-compatible", content: "IE=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: "/theme/theme-light/indigo/theme.css" },
      ],
    },
  },
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  css: [
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "prismjs/themes/prism-coy.css",
    "@/assets/styles.scss",
  ],

  build: {
    transpile: ["primevue"],
  },

  ssr: false,
  modules: [
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-typed-router",
    // '@vue-macros/nuxt',
  ],
  piniaPersistedstate: {
    storage: "localStorage",
  },

  googleFonts: {
    families: {
      Lato: true,
      Roboto: true,
      Nunito: [400, 500, 600, 700],
    },
  },
  // macros: {
  //   reactivityTransform: true,
  // },
  imports: {
    dirs: [
      // scan all modules within given directory
      "composables/**",
      "stores",
    ],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      extensions: [".vue"],
    },
    {
      dirs: [
        {
          path: "~/components/global",
          global: true,
        },
        "~/components",
      ],
    },
  ],

  supabase: {
    redirectOptions: {
      login: "/auth/signin",
      callback: "/confirm",
    },
    clientOptions: {
      auth: {
        persistSession: true,
      },
    },
  },
  // Pinia Auto imports
  // import { defineStore } from 'pinia'
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  runtimeConfig: {
    // Public config
    public: {
      BASE_URL: process.env.BASE_URL || "http://localhost:3000",
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
});
