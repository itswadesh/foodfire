<template>
  <div>
    <section class="section pt3">
      <div class="rows is-mobile">
        <center>
          <router-link to="/" class="button is-dark">Back to Menu</router-link>
        </center>
      </div>
      <br/>
      <div class="rows is-mobile">
        <article class="media mb-36" v-for="p in cartItems" :key="p['.key']">
          <figure class="media-left">
            <p class="image is-128x128">
              <img :src="p.img">
                        </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <strong>{{p.name}}</strong>
            </div>
          </div>
          <div class="media-right">
            <h1 class="big">{{p.price | currency}}</h1>
            <cart-buttons :product="p" />
          </div>
        </article>
        <center v-if="cartItems.length==0">
          <h1>Please go back to Restaurant menu and add some food to continue</h1>
        </center>
      </div>
    </section>
    <div class="cart-total">
      <b-message title="">
        <div class="columns is-mobile">
          <div class="column">
            <p class="grey">Total Amount</p>
            <h2 class="big">{{getTotal | currency}}</h2>
          </div>
          <div class="column">
            <a class="button is-danger is-rounded is-big" :disabled="getTotal==0" @click="placeOrder()">Place Order</a>
          </div>
        </div>
        <div class="columns is-mobile">
          <p class="green">Please allow us 45mins for delivery</p>
        </div>
      </b-message>
      <div class="cart-total-after"> </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const CartButtons = () => import("~/components/CartButtons");

export default {
  components: { CartButtons },
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

    placeOrder() {
      if (this.getTotal == 0) return;
      let user = this.user;
      if (!this.user) {
        this.googleSignIn();
      } else {
        this.$dialog.prompt({
          confirmText: "Confirm Order",
          message: `Address:`,
          inputAttrs: {
            value: user.address,
            placeholder: "Y-1, Sector-18"
          },
          onConfirm: address => {
            this.checkout({ address });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
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
</style>
