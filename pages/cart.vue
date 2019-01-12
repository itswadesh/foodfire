<template>
  <div>
    <nav-bar />
    <div class="container">
      <center class="title">
        <strong>My Cart</strong>
      </center>
      <center v-if="cartItems.length==0">
        <div class="container">
          <div class="card shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="grey"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            <h2 class="grey">
              Please go back to Restaurant menu and add some food to continue...</h2>
          </div>
          <nuxt-link
            to="/"
            class="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fff"
              viewBox="0 0 24 24"
            >
              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
              <path
                d="M0 0h24v24H0z"
                fill="none"
              /></svg>
            Back to Menu
          </nuxt-link>
        </div>
      </center>
      <products
        v-else
        :products="cartItems"
        :showcart="true"
      />
    </div>
    <div class="footer">
      <a v-if="!cartItems.length==0">
        <div class="cart-total footer">
          <div class="container2 ">
            <div class="card shadow-lg2 w100">
              <div>
                <div class="is-mobile">
                  <div class="align">
                    <div class="amount_align">
                      <p class="grey">Total Amount</p>
                    </div>
                    <div>
                      <h2 class="big">{{getTotal | currency}}</h2>
                    </div>
                  </div>
                  <div>
                    <button
                      class="button"
                      :disabled="getTotal==0 || loading"
                      @click="placeOrder()"
                    >Place Order</button>
                  </div>
                </div>
                <div class="is-mobile">
                  <p class="green">Please allow us 45mins for delivery</p>
                </div>
                <div class="cart-total-after"> </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const Products = () => import("~/components/Products");
const NavBar = () => import("~/components/NavBar");
export default {
  props: ["products"],
  data() {
    return {
      loading: false
    };
  },
  components: { Products, NavBar },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: "cart/checkCart",
      getTotal: "cart/getTotal"
    })
  },
  methods: {
    ...mapActions({
      checkout: "cart/checkout",
      googleSignIn: "auth/googleSignIn",
      addToCart: "cart/addToCart"
    }),

    async placeOrder() {
      if (this.loading) return;
      if (this.getTotal == 0) return;
      this.loading = true;
      if (!this.user) {
        try {
          await this.googleSignIn();
          this.loading = false;
          this.askAddress();
        } catch (e) {
          this.loading = false;
        }
      } else {
        this.askAddress();
      }
    },
    askAddress() {
      this.loading = true;
      let user = this.user;
      this.$dialog.prompt({
        confirmText: "Confirm Order",
        message: `Address:`,
        inputAttrs: {
          value: user.address,
          placeholder: "Y-1, Sector-18"
        },
        onConfirm: address => {
          this.checkout({ address });
          this.loading = false;
        },
        onCancel: res => {
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  overflow: scroll;
}
.footer {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  font-family: Karla, Roboto, sans-serif;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  padding: 0.875rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.grey {
  font-size: 23px;
  color: grey;
}
.shadow-lg2 {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0 1.5rem;
}
</style>

