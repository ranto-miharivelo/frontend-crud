// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  build:{
    // vue-toastification - old commonjs module 
    transpile: ['vue-toastification'],
  },
  ssr:true
  
})

