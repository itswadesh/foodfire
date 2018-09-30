<template>
  <div>
    <section v-if="settings">
      <center>
        <b-switch type="is-danger" v-model="settings.closed" @input="changeStatus(settings.closed)"><i v-if="settings.closed">Restaurant Closed</i><i v-else>Restaurant Open</i></b-switch>
      </center>
    </section>
    <orders />

  </div>
</template>

<script>
const Overlay = () => import("~/components/Overlay");
const Orders = () => import("~/components/Orders");
const Info = () => import("~/components/Info");
const Hero = () => import("~/components/Hero");
import { db } from "~/service/firebase";
export default {
  data() {
    return {};
  },
  firestore() {
    return {
      settings: db.collection("settings").doc("shop")
    };
  },
  methods: {
    changeStatus(closed) {
      db.collection("settings")
        .doc("shop")
        .update({
          closed: closed
        });
    }
  },
  async created() {},
  components: { Overlay, Orders, Info, Hero }
};
</script>
