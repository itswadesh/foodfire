<template>
  <div v-if="profile">
    <div class="img1">
      <img :src="profile.avatar" class="rounded" />
    </div>
    <div class="card shadow-lg2 columns">
      <div class="margin">
        <label for="login"></label>
        <h5 v-if="profile">
          <u>{{ profile.name }}</u>
        </h5>
        <input
          type="text"
          name="Email"
          placeholder="Email Address*"
          value="required"
          v-if="profile"
          v-model="profile.email"
          disabled
        />
      </div>
      <p class="margin_phn">
        <label for="Phone no"></label>
        <input
          type="tel"
          name="Phone no"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone no*"
          required
          v-model="profile.phone"
        />
      </p>
      <h1>Enter Address:</h1>
      <div class="margin">
        <textarea
          placeholder="Enter Address Here*"
          v-model="profile.address"
        ></textarea>
      </div>
    </div>
    <div class="footer">
      <a v-if="!cartItems.length == 0">
        <div class="cart-total footer">
          <div class="container2 ">
            <div class="card shadow-lg2 w100">
              <div>
                <div class="is-mobile">
                  <div class="align">
                    <div class="amount_align">
                      <p class="gray">Total Amount</p>
                    </div>
                    <div>
                      <h2>{{ getTotal | currency }}</h2>
                    </div>
                  </div>
                  <div>
                    <button
                      class="button"
                      :class="disable"
                      :disabled="getTotal == 0 || loading"
                      @click="placeOrder()"
                    >
                      <span :class="fadeIn">{{ text }}</span>
                    </button>
                  </div>
                </div>
                <div class="is-mobile">
                  <p class="green">Please allow us 45mins for delivery</p>
                </div>
                <div class="cart-total-after"></div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const Products = () => import('~/components/Products')
export default {
  props: ['products'],
  async asyncData({ store }) {
    let profile = {}
    let userDetails = await store.dispatch('auth/fetch')
    profile = Object.assign({}, userDetails)
    profile.dob = profile.dob || {}
    profile.state = profile.state || {}
    return { profile }
  },
  data() {
    return {
      loading: false,
      text: 'Place order',
      fadeIn: '',
      disable: 'disable'
    }
  },
  components: { Products },
  computed: {
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // },
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: 'cart/checkCart',
      getTotal: 'cart/getTotal'
    })
  },
  methods: {
    ...mapActions({
      checkout: 'cart/checkout',
      googleSignIn: 'auth/googleSignIn',
      addToCart: 'cart/addToCart'
    }),
    async placeOrder() {
      if (this.loading) return
      if (this.getTotal == 0) return
      if (!this.profile || this.profile.phone == '') {
        alert('Phone number required')
        return
      }
      if (!this.profile.address || this.profile.address == '') {
        alert('Address is mandatory')
        return
      }
      this.text = 'Please Wait. . .'
      this.fadeIn = 'fadeIn'
      this.disable = true
      this.loading = true
      if (!this.profile) {
        try {
          await this.googleSignIn()
          this.loading = false
        } catch (e) {
          this.loading = false
        }
      } else {
        this.checkout({ address: this.profile.address })
      }
    }
  }
}
</script>
<style scoped>
.rounded {
  border-radius: 50px;
}
.align {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
h1 {
  font-size: 14px;
  padding-left: 26px;

  color: #3baaec;
}
h5 {
  font-size: 17px;
  margin-top: 0px;
  color: #3baaec;
  text-align: -webkit-center;
}
h3 {
  font-size: 23px;
}
h4 {
  font-size: 14px;
  padding-left: 26px;
  color: #3baaec;
}
.border {
  border: none;
  outline: none;
  padding-top: 10px;
  text-align: -webkit-center;
}
.margin {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 0;
  padding-top: 10px;
}
.margin_phn {
  padding-left: 28px;
  padding-right: 28px;
}
textarea {
  height: 60px;
  margin-top: -11px;
}
.padding {
  padding-top: 25px;
}
.footer {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.columns {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  padding-left: 0px;
  padding-right: 0px;
  height: auto;
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
  background-color: #fff;
  background-clip: border-box;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
.button {
  font-family: Karla, Roboto, sans-serif;
  text-transform: uppercase;
  color: black;
  border-color: lightgray;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
  background: lightgray;
  border: none;
}
.gray {
  font-size: 23px;
  color: gray;
}
.shadow-lg2 {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0 1.5rem;
}
.top_padding {
  padding-top: 50px;
  font-size: 17px;
}
.img1 {
  text-align: -webkit-center;
  /* height: 92px; */
  padding-top: 3px;
}
img {
  height: 92px;
}

input[type='text'],
input[type='tel'],
textarea {
  width: 100%;
  padding: 8px 4px 8px 10px;
  margin-bottom: 15px;
  border: 1px solid white;
  border: 1px solid #f3f3f3;
  background: white;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 0 #fbb140, inset 0 -2px 10px #e5f1f8;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  font-family: 'Raleway', 'Lato', Arial, sans-serif;
  color: #47494e;
  font-size: 13px;
  border-radius: 6px;
  outline: none;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fadeIn {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.disable {
  color: #f6f7fa;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fb6340;
}
.email {
  letter-spacing: 1px;
  text-transform: capitalize;
}
</style>
