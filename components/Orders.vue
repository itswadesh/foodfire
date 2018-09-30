<template>
  <div>
    <b-message :closable="false" v-for="o in orders" :key="o._id" :title="`${o.name} => ${o.address}`" :type="getStyle(o)">
      <div class="columns is-mobile">
        <b-field class="column">
          <b-radio-button v-model="o.status" native-value="Pending" @input="changeStatus(o)">
            <!-- <b-icon icon="close"></b-icon> -->
            <span>Pending</span>
          </b-radio-button>

          <b-radio-button v-model="o.status" native-value="Shipped" type="is-warning" @input="changeStatus(o)">
            <!-- <b-icon icon="check"></b-icon> -->
            <span>Shipped</span>
          </b-radio-button>

          <b-radio-button v-model="o.status" native-value="Delivered" type="is-success" @input="changeStatus(o)">
            Delivered
          </b-radio-button>

          <b-radio-button v-model="o.status" native-value="Cancelled" type="is-danger" @input="changeStatus(o)">
            Cancelled
          </b-radio-button>
        </b-field>
      </div>
      <div class="columns is-mobile">
        <div class="item">
          <div class="rows is-mobile" v-for="(i,ix) in o.items" :key="ix">
            <div class="media-content">
              <div class="content">
                <strong>{{ix+1}} - {{i.name}}</strong> <small>{{i.price | currency}} (<strong>{{i.qty}}</strong>)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-message>
  </div>
</template>
<script>
import { db } from "~/service/firebase";
export default {
  firestore() {
    return {
      orders: db.collection("orders").orderBy("createdAt", "desc")
    };
  },
  methods: {
    changeStatus(o) {
      db.collection("orders")
        .doc(o[".key"])
        .update({
          status: o.status,
          updatedAt: new Date()
        });
    },
    getStyle(o) {
      let style = "";
      if (o.status === "Cancelled") {
        style = "is-danger";
      } else if (o.status === "Delivered") {
        style = "is-success";
      } else if (o.status === "Shipped") {
        style = "is-warning";
      }
      return style;
    }
  }
};
</script>
<style scoped>
.small {
  font-size: 12px;
}
</style>

