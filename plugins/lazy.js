import Vue from 'vue'
import vueLazy from 'vue-lazyload'
export default ({ store, app: {} }) => {
  Vue.use(vueLazy, {
    observer: true,
    preLoad: 1.3,
    error: '/100x100-err.svg',
    attempt: 1
  })
}
