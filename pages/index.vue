<template>
  <div v-if="settings[0]">
    <hero :closed="settings[0].closed" />
    <info />
    <products :products="products" />
    <overlay :closed="settings[0].closed" />
    <cart-bar />
  </div>
</template>

<script>
const Overlay = () => import("~/components/Overlay");
const Products = () => import("~/components/Products");
const Info = () => import("~/components/Info");
const Hero = () => import("~/components/Hero");
const CartBar = () => import("~/components/CartBar");

import { db } from "~/service/firebase";
export default {
  data() {
    return {
      closed: true
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
  async created() {
  },
  components: { Overlay, Products, Info, Hero, CartBar }
};
</script>
<style scoped>
.green {
  color: green;
}
.grey {
  color: grey;
}
.pt3 {
  padding-top: 3px;
}
.mb-36 {
  margin-bottom: -36px;
}
</style>
