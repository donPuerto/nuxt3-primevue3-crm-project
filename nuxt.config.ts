// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  // supabase Options
  supabase: {
    // Options
  },
  piniaPersistedstate: {},
})
