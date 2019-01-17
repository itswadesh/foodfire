<template>
  <div>
    <nav-bar />
    <div>
      <center class="title">
        <strong>My Cart</strong>
      </center>
      <center v-if="cartItems.length==0">
        <div class="container">
          <div class="card shadow-lg2">
            <img src="/bag-black.svg" />
            <h2 class="grey">
              Please go back to Restaurant menu and add some food to continue...</h2>
          </div>
          <nuxt-link
            to="/"
            class="button"
          >
            <img src="/backarrow.svg" />

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
        let address = "Y1, Sector-18";
        this.checkout({ address });
      }
    },
    askAddress() {
      //   this.loading = true;
      //   let user = this.user;
      //   this.$dialog.prompt({
      //     confirmText: "Confirm Order",
      //     message: `Address:`,
      //     inputAttrs: {
      //       value: user.address,
      //       placeholder: "Y-1, Sector-18"
      //     },
      //     onConfirm: address => {
      //       this.loading = false;
      //     },
      //     onCancel: res => {
      //       this.loading = false;
      //     }
      //   });
    }
  }
};
</script>
<style scoped>
.svgclr {
  fill: currentColor;
}
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
  padding: 1px 0rem;
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

