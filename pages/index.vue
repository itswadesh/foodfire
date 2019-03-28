<template>
  <div>
    <Loading :active="!settings || !settings[0]" />
    <div v-if="settings[0]">
      <hero :closed="settings[0].closed" />
      <info />
      <products
        :products="products"
        :showcart="true"
      />
      <overlay :closed="settings[0].closed" />
      <cart-bar />
    </div>
  </div>
</template>
<script>
const Loading = () => import("~/components/Loading");
const Overlay = () => import("~/components/Overlay");
const Products = () => import("~/components/Products");
const Info = () => import("~/components/Info");
const Hero = () => import("~/components/Hero");
const CartBar = () => import("~/components/CartBar");
import { db } from "~/service/firebase";
export default {
  data() {
    return {
      loading: false,
      closed: true,
      settings: [],
      products: []
    };
  },
  firestore() {
    return {
      settings: db.collection("settings"),
      products: db.collection("products")
    };
  },
  methods: {
    addReptile: function() {
      this.$firestore.reptiles.add({
        name: this.newReptile,
        timestamp: new Date()
      });
      this.newReptile = "";
    },
    deleteReptile: function(reptile) {
      this.$firestore.reptiles.doc(reptile[".key"]).delete();
    }
  },
  async created() {},
  components: { Loading,Overlay, Products, Info, Hero, CartBar }
};
</script>
