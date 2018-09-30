import { ANALYTICS_TRACKING_ID, head, manifest } from "./config";
import helmet from 'helmet'
module.exports = {
  mode: 'spa',
  head,
  manifest,
  loading: '~/components/Loading.vue',
  css: ['~assets/styles/transitions.css'],
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/firestore.js'
  ],
  modules: [
    '@nuxtjs/sitemap',
    'nuxt-robots-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/component-cache',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'nuxt-client-init-module',
    'cookie-universal-nuxt',
    'nuxt-buefy', ['@nuxtjs/google-analytics', { id: ANALYTICS_TRACKING_ID }]
  ],
  toast: {
    theme: "bubble",
    position: 'top-center',
    singleton: true
  },
  render: {
    gzip: { level: 1 },
    http2: { push: true },
    static: {
      maxAge: "1y"
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
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    exclude: ['/my/**']
  }
}
