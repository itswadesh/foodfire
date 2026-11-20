import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  isError: null // Only required to inform App.vue that an error is there hence initiate the snackbar
})
export const mutations = {
  setSuccess(state, msg) {
    this.$toast.success(msg).goAway(2000)
  },
  setErr(state, err) {
    // console.log('global error at [store/index].....', err);
    const duration = err.duration || 3000
    const message = err.message || err
    if (err && err.response) {
      this.$toast.error(err.response.data).goAway(duration)
      throw err.response.data
    } else {
      this.$toast.error(message).goAway(duration)
      throw err // When it can not communicate to server
    }
  }
}
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = this.$cookies.get('Authorization')

    // Cart
    if (this.$cookies) {
      try {
        commit('cart/storeCart', this.$cookies.get('ArialShop_items'))
      } catch (error) {
        console.log('fetch cart error', error)
      }
    } else {
    }

    if (auth) {
      try {
        await dispatch('auth/fetch')
        return true
      } catch (error) {
        console.log('fetch user error', error)
        return false
      }
    } else {
      return false
    }
  },
  async nuxtClientInit({ commit, dispatch }, context) {
    let auth = this.$cookies.get('Authorization')

    // Cart
    if (this.$cookies) {
      try {
        commit('cart/storeCart', this.$cookies.get('ArialShop_items'))
        // await dispatch('cart/fetch') // Fetch from database
        // return true
      } catch (error) {
        console.log('fetch cart error', error)
      }
    } else {
    }

    if (auth) {
      try {
        await dispatch('auth/fetch')
        return true
      } catch (error) {
        console.log('fetch user error', error)
        return false
      }
    } else {
      return false
    }
  }
}
