import { currency } from '~/config'
import { db } from '~/service/firebase'

const state = () => ({
  items: [],
  skuArray: [],
  currency: currency,
  discount: 0,
  freeShipping: false,
  shipping: {},
  showCart: false
})

// getters
const getters = {
  showCart(state) {
    return state.showCart
  },
  getItems(state) {
    return state.items && state.items.length > 0 ? state.items : []
  },

  getTotalDiscount(state) {
    return 0
  },

  getShippingAmount() {
    let amount = 0
    return amount
  },

  getDiscount(state) {
    return state.discount
  },

  getTotalCount(state) {
    return state.items.length === 0
      ? 0
      : state.items.reduce((prevVal, elem) => prevVal + elem.qty, 0)
  },

  getQty: state => ({ _id }) => {
    for (let i in state.items) {
      if (state.items[i]._id === _id) {
        return state.items[i].qty
      }
    }
  },

  checkCart: state => ({ _id }) => {
    // Returns true when there is item in cart
    return state.skuArray.includes(_id)
  },

  getSubtotal(state) {
    // After discount
    if (state.items) {
      const sum = state.items.reduce((subtotal, item) => {
        return subtotal + (item.price || 0) * (item.qty || 1)
      }, 0)
      return state.discount ? sum - state.discount : sum
    } else {
      return 0
    }
  },

  getShipping(state) {
    const sum = state.items.reduce((subtotal, item) => {
      return subtotal + (item.shipping || 0) * (item.qty || 1)
    }, 0)
    return state.freeShipping ? 0 : sum
  },

  getTotal(state, getters) {
    //After shipping
    const discount = state.discount || 0
    return getters.getSubtotal + getters.getShipping
  }
}

// actions
const actions = {
  addToCart({ commit }, payload) {
    commit('addToCart', payload)
  },
  applyDiscount({ commit }, payload) {
    commit('applyDiscount', payload)
  },

  async checkout({ commit, state, rootState, getters }, { address }) {
    const user = (rootState.auth || {}).user || {}
    let email = user.email
    let name = user.name
    if (
      email == null ||
      email == 'undefined' ||
      email == '' ||
      email == undefined
    ) {
      commit('setErr', 'Please enter your email', { root: true })
      return
    }
    let cartItems = state.items
    if (cartItems.length === 0) {
      commit('setErr', 'Please add some items to cart', { root: true })
      return
    }
    let items = []
    for (let ix in cartItems) {
      let i = cartItems[ix]
      items.push({
        name: i.name || '',
        description: i.description || '',
        img: i.img || '',
        price: i.price || 0,
        qty: i.qty || 1
      })
    }
    let orderDetails = {
      createdAt: new Date(),
      name: name || '',
      address: address || '',
      email,
      items: items || [],
      status: 'Pending',
      amount: {
        total: getters.getTotal,
        qty: getters.getTotalCount,
        discount: getters.getDiscount,
        shipping: getters.getShippingAmount,
        subtotal: getters.getSubtotal
      }
    }
    try {
      let newOrder = await db.collection('orders').add(orderDetails)
      this.$router.push(`/success?id=${newOrder.id}`)
    } catch (err) {
      if (err.response) commit('setErr', err.response.msg, { root: true })
      // used at order.controller
      else commit('setErr', err.response, { root: true })
    }
  }
}

// mutations
const mutations = {
  storeCart(state, items) {
    if (!items) return
    // items = JSON.parse(items)
    state.items = items
    state.skuArray = items.map(a => a._id)
  },

  clearCart(state, items) {
    state.items = []
    this.$cookies.set('ArialShop_items', [])
    state.items = []
    state.skuArray = []
  },

  applyDiscount(state, amount) {
    state.discount = amount
  },
  // adds or remove an item from cart
  addToCart(state, { _id, name, img, price, qty }) {
    if (state.items.length === 0) state.showCart = true // User training
    const record = state.items.find(p => p._id === _id)
    if (record) {
      // If the product is already there in cart.
      record.qty += qty
      if (record.qty <= 0) {
        state.items = state.items.filter(r => {
          console.log('Check for particular variant deletion')
          return r._id !== _id
        })
      }
    } else {
      const item = { _id, name, price, img, qty }
      state.items.push(item)
    }
    if (state.items.length === 0) state.showCart = false // When all items are removed from cart
    this.$cookies.set('ArialShop_items', state.items)
    state.skuArray = state.items.map(a => a._id)
    if (qty > 0) {
      let msg = 'Item  to cart'
      this.$toast.success(msg).goAway(2000)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
