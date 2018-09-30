<template>
  <div>
    {{getTotal}}
    <router-link class="cart-bar" to="/cart" v-if="getTotal>0">
      <div>
        {{getTotalCount}} items | {{getTotal | currency}}
      </div>
      <div>
        <b-icon icon="cart"></b-icon> VIEW CART
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    ...mapGetters({
      getTotalCount: "cart/getTotalCount",
      getTotal: "cart/getTotal"
    })
  }
};
</script>

<style scoped>
.cart-bar {
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  width: 100%;
  padding: 20px;
  background: #60b246;
  color: #fff;
  z-index: 2;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
}
</style>
