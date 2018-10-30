<template>

  <body>
    <div>
      <div>
        <nav-bar />
      </div>
      <br />
      <center v-if="cartItems.length==0">
        <div class="container">
          <div class="card border-0 shadow-lg bg">
            <div class="p-5">
              <div class="row align-items-center">
                <div class="col-lg-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0zm18.31 6l-2.76 5z" fill="none" />
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
                  </svg>
                  <h2>
                    Please go back to Restaurant menu and add some food to continue...</h2>
                </div>
                <div class="col-lg-3 ml-lg-auto">
                  <a type class="btn btn-block btn-white btn-lg btncontent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svg2">
                      <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
                      <path d="M0 0h24v24H0z" fill="none" /></svg>
                    <router-link to="/" class="btnclr">Back to Menu</router-link>
                  </a></div>
              </div>
            </div>
          </div>
        </div>
      </center>
      <products v-else :products="cartItems" />

      <div class="cart-total">
        <div class="container2">
          <div class="card border-0 shadow-lg2 bg">
            <div>
              <div class="columns is-mobile">
                <div class="column align">
                  <p class="grey">Total Amount</p>
                  <h2 class="big">{{getTotal | currency}}</h2>
                </div>
                <div class="column center ">
                  <a type class="btn btn-block btn-white btn-lg btncontent " :disabled="getTotal==0 || loading" @click="placeOrder()" style="color:white">Place Order</a>
                </div>
              </div>
              <div class="columns is-mobile center">
                <p class="green">Please allow us 45mins for delivery</p>
              </div>
              <div class="cart-total-after"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const Products = () => import("~/components/Products");
const NavBar = () => import("~/components/NavBar");
export default {
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
      getTotal: "cart/getTotal"
    })
  },
  methods: {
    ...mapActions({
      checkout: "cart/checkout",
      googleSignIn: "auth/googleSignIn"
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
.align {
  display: flex;
  justify-content: space-around;
}
.svg2 {
  fill: white;
}
.btnclr {
  color: white;
  text-decoration: none;
}
.big {
  font-size: 1.8em;
  font-weight: bold;
}
.cart-total {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.cart-total-after {
  content: " ";
  background: -webkit-linear-gradient(135deg, #f4f4f5 7px, transparent 0),
    -webkit-linear-gradient(45deg, #f4f4f5 7px, transparent 0);
  background: -o-linear-gradient(135deg, #f4f4f5 7px, transparent 0),
    -o-linear-gradient(45deg, #f4f4f5 7px, transparent 0);
  background: linear-gradient(-45deg, #f4f4f5 7px, transparent 0),
    linear-gradient(45deg, #f4f4f5 7px, transparent 0);
  background-position: left bottom;
  background-repeat: repeat-x;
  background-size: 12px 14px;
  display: block;
  left: 0;
  width: 100%;
  height: 14px;
  bottom: 0;
}
.message {
  margin-bottom: -5px;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.container2 {
  width: 100%;
}
.bg {
  background: whitesmoke;
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
  background-color: #fff;
  background-clip: border-box;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
.p-5 {
  padding: 3rem !important;
}
.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
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
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn-lg {
  padding: 0.875rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.col-lg-3 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.col-lg-8 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.btncontent {
  display: flex;
  justify-content: center;
  align-items: center;
}
.grey {
  font-size: 23px;
  color: grey;
}
.center {
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
}
.shadow-lg2 {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

a {
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}
.shadow,
.profile-page .card-profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
</style>
