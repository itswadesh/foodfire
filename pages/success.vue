<template>
  <div>
    <center>
      <h1>Order Placed Successfully!</h1>
      <b>Amount to be paid: </b><br/>
      <h1>{{$route.query.amount | currency}}</h1>
      <router-link to="/" class="button is-success">Restaurant Menu</router-link>
      <!-- <router-link to="/my/orders" class="button is-dark">Find My Previous Orders</router-link> -->
    </center>
  </div>
</template>

<script>
import { clearCart } from "@/config";
export default {
  async created() {
    try {
      if (clearCart) this.$store.commit("cart/clearCart", {});
    } catch (e) {}
  },
  head() {
    return {
      title: "Payment",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "This page receives payment status after payments made from payment gateway"
        }
      ]
    };
  }
};
</script>
<style scoped>
.bluee {
  color: blue;
}
.redd {
  color: red;
}
.amount {
  font-weight: bold;
  color: red;
}
</style>
