<template>
  <div>
    <nav-bar />
    <center class="title">
      <strong>Order Details</strong>
    </center>
    <div class="container">
      {{orders}}
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CartButtonsVue from "~/components/CartButtons.vue";
import { db } from "~/service/firebase";

const NavBar = () => import("~/components/NavBar");
export default {
  data() {
    return {};
  },
  components: { NavBar },
  firestore() {
    return {
      orders: db
        .collection("orders")
        .where("email", "==", "2lessons@gmail.com")
        .orderBy("createdAt", "desc")
    };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {}
};
</script>
<style scoped>
center {
  font-size: 23px;
  font-weight: 700;
  padding-top: 10px;
}
</style>

