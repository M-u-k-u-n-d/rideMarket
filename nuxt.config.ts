export default defineNuxtConfig({
  compatibilityDate: '2025-09-10',
  nitro: {
    preset: 'vercel'
  },
  modules: [
    "@nuxtjs/tailwindcss", 
    "@nuxt/image",  // ✅ keep only this
    "@vueuse/nuxt",
    "@nuxtjs/supabase"
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  image: {
    format: ['webp', 'avif'],
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  supabase: {
    redirect: false,
  },
});