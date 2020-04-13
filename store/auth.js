import { tokenExpiry } from '~/config'
import { firebase, googleAuthProvider } from '~/service/firebase'

export const state = () => ({
  user: null
})

// mutations
export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  clearUser(state) {
    console.log('Logout Successful')
    state.user = null
  }
}

export const actions = {
  async fetch({ commit }) {
    try {
      const data = this.$cookies.get('user')
      commit('setUser', data)
      return data
    } catch (err) {
      commit('clearUser')
      commit('setErr', err, { root: true })
    }
  },
  async googleSignIn({ commit }) {
    const vm = this
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(function(result) {
        var token = result.credential.accessToken
        var user = result.user
        commit('setUser', {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL
        })
        vm.$cookies.set(
          'user',
          { name: user.displayName, email: user.email, avatar: user.photoURL },
          { path: '/' }
        )
        vm.$cookies.set('Authorization', token, {
          path: '/',
          maxAge: tokenExpiry
        })
      })
      .catch(function(error) {
        var errorCode = error.code
        var email = error.email
        var credential = error.credential
        commit(
          'setErr',
          { message: error.message, duration: 15000 },
          { root: true }
        )
      })
  },
  async googleSignOut({ commit }, payload) {
    const vm = this
    firebase
      .auth()
      .signOut()
      .then(function() {
        commit('clearUser') // Removes user from Store
        vm.$cookies.remove('Authorization')
      })
      .catch(function(error) {
        console.error(error)
      })
  }
}
