const path = require('path')

const netlifyProxy = {
  '/.netlify': {
    target: 'http://localhost:9000',
    pathRewrite: {'^/.netlify/functions': ''}
  }
}

// const proxy = process.env.USE_PROXY ? netlifyProxy : false
const proxy = netlifyProxy


export default {
  mode: 'universal',
  head: {
    title: 'Ellen Marie Bartling - Experience Designer',
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
  loading: { color: '#000' },
  css: ['@/assets/app.scss'],
  ignore: ['./content/**'],
  plugins: [
    { src: '@/plugins/plyr.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    debug: true
  },
  proxy: {
    '/.netlify': {
      target: 'http://localhost:9000',
      pathRewrite: {'^/.netlify/functions': ''}
    }
  },
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common"
      config.resolve.alias['~content'] = path.resolve('./content/latest/')
    }
  }
}
