import { ANALYTICS_TRACKING_ID, head, manifest } from './config'
import helmet from 'helmet'
module.exports = {
  mode: 'spa',
  head,
  manifest,
  loading: '~/components/Loading.vue',
  css: ['~assets/styles/reset.css', '~assets/styles/transitions.css'],
  plugins: [
    { src: '~plugins/init.js', mode: 'client' },
    { src: '~plugins/lazy', mode: 'client' },
    { src: '~plugins/filters.js' },
    { src: '~plugins/firestore.js' }
  ],
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/component-cache',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/robots',
    'cookie-universal-nuxt',
    ['@nuxtjs/google-analytics', { id: ANALYTICS_TRACKING_ID }]
  ],
  toast: {
    theme: 'bubble',
    position: 'top-center',
    singleton: true
  },
  render: {
    gzip: { level: 1 },
    http2: { push: true },
    static: {
      maxAge: '1y'
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'script') {
          const ignoredRoutes = ['legal']
          if (ignoredRoutes.some(r => file.includes(r))) {
            return false
          }
        }
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  serverMiddleware: [
    helmet({
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    })
  ],

  build: {
    app: 'app.[chunkhash].js',
    chunk: '[name].[chunkhash].js',
    extractCSS: true,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  },
  sitemap: {
    hostname: 'https://foodfire.info/',
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    exclude: ['/my/**']
  }
}
