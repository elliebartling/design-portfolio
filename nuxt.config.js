const path = require('path')

const netlifyProxy = {
  '/.netlify/functions/': {
    target: 'http://localhost:9000',
    pathRewrite: {'^/.netlify/functions/': ''}
  }
}

const proxy = process.env.USE_PROXY ? netlifyProxy : false


export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i,700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/app.scss'
  ],
  ignore: [
    './content/**'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/plyr.js', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    debug: false
  },

  proxy: proxy,
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common"
      config.resolve.alias['~content'] = path.resolve('./content/latest/')
    }
  }
}
