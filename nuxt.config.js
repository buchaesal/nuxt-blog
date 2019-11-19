
const src = 'client'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - NUXT BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js를 사용해 제작한 블로그입니다.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "//fonts.googleapis.com/css?family=Noto+Sans+KR" }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://vuejs-http-9bdb4.firebaseio.com'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-typescript'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  srcDir: src,
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'pageNotFound',
        path: '*',
        component: resolve(__dirname, src + '/pages/404.vue')
      })
    }
  }
}
