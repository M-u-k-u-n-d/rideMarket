export default defineNuxtConfig({
  compatibilityDate: '2025-09-10',

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  supabase: {
    redirect: false, // don’t auto-redirect, we’ll handle manually
  },
})
