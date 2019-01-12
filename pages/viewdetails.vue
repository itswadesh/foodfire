<template>
  <div>
    <nav-bar />
        <center>View Details</center>
          <products :products="cartItems" v-if="cartItems!=0" :showcart="false" />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CartButtonsVue from "../components/CartButtons.vue";
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
      cartItems: state => state.cart.items || [],
      orderItems: state => state.orderItems || []
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
<style>
center {
  font-size: 23px;
  font-weight: 700;
  padding-top: 10px;
}
.font {
  font-size: 13px;
}
</style>

