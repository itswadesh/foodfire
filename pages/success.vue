<template>
  <div>
    <div class="container head">
      <div>
        <div v-if="order">
          <div class="row align-items-center">
            <div class="align">
              <div>
                <div class="card svgcard">
                  <img class="svgheight" src="/circleright.svg" />
                  <h3 class="text-primary-light font-weight-bold">
                    Thank You!!!
                  </h3>
                </div>
                <br />
                <div>
                  <h2>
                    Your order request has been received
                    <small>successfully.</small>
                  </h2>
                  <p class="font">
                    Transaction ID:
                    <span class="font-weight-bold">{{ order['.key'] }}</span>
                  </p>
                  <h4>
                    You will receive a message or call regarding the
                    confirmation of the product.
                  </h4>
                  <h5>
                    <strong>Note: </strong>Your order will be sent to you,
                    usually within 1hr.
                  </h5>
                </div>
                <div class="address mb-3 " v-if="order.address">
                  <span class="name">{{ order.name }}</span
                  ><br />
                  <span class="name">{{ order.address }}</span
                  ><br />
                </div>
              </div>
              <div>
                <div class="products ">
                  <div class="margin">
                    <span class="order_header"> ORDER SUMMARY</span>
                  </div>
                  <nuxt-link
                    class="product"
                    v-for="(p, index) in order.items"
                    :key="index"
                    :to="'/' + p.slug + '?id=' + p.pid"
                  >
                    <div class="flex product_card columns">
                      <div class="image">
                        <img v-lazy="p.img" alt="" />
                      </div>
                      <div>
                        <span>{{ p.name }}</span>
                      </div>
                      <div class="price-align">
                        <div class="big">{{ p.price | currency }}</div>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
                <h6>
                  <u>For customer service</u><br />
                  Please contact:<router-link class="cursor" to="">
                    care@foodfire.in</router-link
                  >
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_align1 footer">
      <a type class="btn btn-block btn-white1 btn-lg btncontent">
        <img src="/backarrow.svg" />
        <router-link to="/" class="btnclr">Restaurant Menu</router-link>
      </a>
    </div>
    <!-- <router-link to="/my/orders" class="button is-dark">Find My Previous Orders</router-link> -->
  </div>
</template>
<script>
import { clearCart } from '@/config'
import { db } from '~/service/firebase'
export default {
  components: {},
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    }
  },
  firestore() {
    if (this.$route.query.id)
      return {
        order: db.collection(`orders`).doc(this.$route.query.id)
      }
    else return { order: {} }
  },
  async asyncData({ redirect, store, route }) {
    store.commit('cart/clearCart', {})
    return { orderNo: route.query.id }
  },
  methods: {
    cancelOrder() {
      console.log('Cancel order  requested')
    }
  },
  head() {
    return {
      title: 'Order Success',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Order placed successfully'
        }
      ]
    }
  }
}
</script>
<style scoped>
.btnclr {
  color: white;
  text-decoration: none;
}
.btn-white1 {
  color: #212529;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.container {
  width: 100%;
  padding-top: 0px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.border-0 {
  border: 0 !important;
}
.shadow-lg {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: linear-gradient(50deg, #67d44d 0, #0a8e12 100%) !important;
  background-clip: border-box;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
.product_card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
  width: 100%;
}
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.text-white {
  color: #fff !important;
}
.lead {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.7;
  margin-top: 1.5rem;
}
.margin {
  margin-top: 1rem !important;
}
.btn {
  position: relative;
  text-transform: uppercase;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  will-change: transform;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-white {
  color: #212529;
  background-color: #fff;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn-lg {
  padding: 7px;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.btn_align {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.btn_align1 {
  min-height: 0;
  padding-top: 9px;
  padding-bottom: 0px;
}
.align {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding: 10px;
  text-align: center;
}
.btncontent {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
h1 {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1px;
  color: #32325d;
  font-size: 20px;
}
h2 {
  font-size: 13px;
  margin-top: -10px;
}
small {
  color: #09a709;
  font-size: 13px;
}
.svgheight {
  height: 29px;
  margin-top: 13px;
}
.svgcard {
  width: 100%;
  padding-top: 0px;
  padding-right: 11px;
  padding-left: 9px;
  margin-right: auto;
  margin-left: auto;
  height: 79px;
  border-radius: 0%;
}
h3 {
  letter-spacing: 1px;
  text-transform: initial;
  margin-top: 8px;
  font-size: 1.125rem;
  font-family: sans-serif;
  color: white;
}
h4 {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  padding-left: 10px;
  padding-right: 10px;
  color: slategray;
}
h5 {
  margin-top: -4px;
  font-size: 13px;
}
br {
  line-height: 19px;
}
.font {
  font-weight: bold;
  font-size: 13px;
}
.name {
  font-size: 18px;
  color: #3a3ac9;
}
.cursor {
  cursor: pointer;
}
.color {
  color: aliceblue;
}
.products {
  margin: 0 1rem;
}
.product {
  align-items: flex-start;
  display: flex;
  text-align: left;
  padding-top: 1rem;
}
strong {
  color: red;
  font-weight: 700;
}
.image {
  width: 104px;
}
.image img {
  border-radius: 50px;
}
.border {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
.price-align {
  padding-right: 10px;
}
.big {
  font-size: 1.5em;
  font-weight: 700;
}
.columns {
  margin-top: -0.75rem;
  padding-left: 0px;
  padding-right: 0px;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  border-radius: 10px;
}
.order_header {
  font-weight: 700;
  font-family: sans-serif;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.head {
  position: relative;
  left: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 18px;
}
</style>
