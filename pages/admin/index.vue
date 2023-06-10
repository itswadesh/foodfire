<template>
  <div>
    <Loading :active="!orders || !orders[0]" />

    <div class="pstn">
      <img src="/truck.svg" />
      <h4 class="textalgn">Admin Panel / Order History</h4>
      <br />
    </div>
    <div
      v-for="o in orders"
      :key="o._id"
      :title="`${o.name} => ${o.address}`"
      :type="getStyle(o)"
      class="container"
    >
      <div class="card shadow">
        <div class="status">
          <h6>Order Status: {{ o.status }}</h6>
        </div>
        <div class="border">
          <div class="column is-mobile">
            <div class="breadcrumb-pagination">
              <div
                class="circle"
                v-bind:class="{
                  active1: o.status == 'PENDING',
                  Pending: o.status == 'Pending',
                }"
                native-value="Pending"
                @input="changeStatus(o)"
                @click="update('Pending')"
              >
                <span>
                  <img class="svgsize" src="/forwardarrow.svg" />
                </span>
                <div>
                  <p
                    class="fntclr"
                    v-bind:class="{ Pending: o.status == 'Pending' }"
                  >
                    Pending
                  </p>
                </div>
              </div>
              <div
                class="circle"
                v-bind:class="{
                  active2: o.status == 'SHIPPED',
                  Shipped: o.status == 'Shipped',
                }"
                native-value="Shipped"
                type="is-warning"
                @input="changeStatus(o)"
                @click="update('Shipped')"
              >
                <span>
                  <img class="svgsize" src="/truckwhite.svg" />
                </span>
                <div>
                  <p
                    class="fntclr"
                    v-bind:class="{ Shipped: o.status == 'Shipped' }"
                  >
                    Shipped
                  </p>
                </div>
              </div>
              <div
                class="circle"
                v-bind:class="{
                  active3: o.status == 'DELIVERED',
                  Delivered: o.status == 'Delivered',
                }"
                native-value="Delivered"
                type="is-success"
                @input="changeStatus(o)"
                @click="update('Delivered')"
              >
                <span>
                  <img class="svgsize" src="/delivered.svg" />
                </span>
                <div>
                  <p
                    class="fntclr2"
                    v-bind:class="{ Delivered: o.status == 'Delivered' }"
                  >
                    Delivered
                  </p>
                </div>
              </div>
              <div
                class="circle"
                v-bind:class="{
                  active4: o.status == 'CANCELLED',
                  Cancelled: o.status == 'Cancelled',
                }"
                native-value="Cancelled"
                type="is-danger"
                @input="changeStatus(o)"
                @click="update('Cancelled')"
              >
                <span>
                  <img class="svgsize" src="/backcross.svg" />
                </span>
                <div>
                  <p
                    class="fntclr3"
                    v-bind:class="{ Cancelled: o.status == 'Cancelled' }"
                  >
                    Cancelled
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="border">
            <h5>ORDER ID: {{ o['.key'] }}</h5>
          </div>
          <div class="add_flex_align">
            <div>
              <h1>{{ o.name }}</h1>
            </div>
            <div class="payment">
              <span class="payment_color">
                Payment:
                <strong>COD</strong>
              </span>
            </div>
          </div>
          <div class="add_flex_align">
            <div>
              <h2>{{ o.address }}</h2>
            </div>
            <div class="date">
              <h4>Date: **/**/****</h4>
            </div>
          </div>
        </div>
        <div class="columns is-mobile border">
          <div class="is-mobile" v-for="(i, ix) in o.items" :key="ix">
            <div class="media-content">
              <div class="align">
                <div class="item_namealign">{{ ix + 1 }}.</div>
                <div>
                  <img v-lazy="i.img" />
                </div>
                <div class="item_namealign">
                  <strong>{{ i.name }}</strong>
                </div>
                <div class="item_namealign">
                  <strong>{{ i.price | currency }}</strong> x
                  <strong>{{ i.qty }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add_flex_align">
          <div></div>
          <div>
            <h3>Total: ₹{{ o.amount.total }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const Loading = () => import('~/components/Loading')

import { db } from '~/service/firebase'
export default {
  props: ['products', 'status', 'PENDING', 'DELIVERED', 'SHIPPED', 'CANCELLED'],
  components: { Loading },
  data() {
    return {}
  },
  firestore() {
    return {
      orders: db.collection('orders').orderBy('createdAt', 'desc'),
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
  },
  methods: {
    update(updated) {
      console.log(updated)
    },
    changeStatus(o) {
      db.collection('orders').doc(o['.key']).update({
        status: o.status,
        updatedAt: new Date(),
      })
    },
    getStyle(o) {
      let style = ''
      return style
    },
  },
}
</script>
<style scoped>
.status {
  padding-top: 10px;
  padding-left: 10px;
}
center {
  font-size: 23px;
  font-weight: 700;
  padding-top: 10px;
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
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
.pstn {
  text-align: center;
}
.shadow {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.textalgn {
  color: #212529 !important;
  padding-top: 0px;
  font-size: 14px;
  text-align: -webkit-center;
}
h1 {
  font-size: 14px;
  padding-left: 10px;
  color: #3a3ac9;
  letter-spacing: 0;
}
h2 {
  font-size: 12px;
  padding-left: 10px;
  color: #1cac7b;
  margin-top: 0px;
}
h3 {
  padding-right: 10px;
  margin-top: 6px;
}
h4 {
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0;
  margin-top: 1px;
}
h5 {
  text-align: -webkit-center;
  color: gray;
  padding-top: 0px;
  height: 0px;
  margin-top: -1.65rem;
}
h6 {
  margin-top: 7px;
  padding-left: 10px;
  font-size: 13px;
}
.is-mobile.columns.is-mobile {
  display: flex;
  flex-direction: column;
  line-height: 1px;
}
.payment_color {
  color: blue;
  text-transform: uppercase;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
}
.columns {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-top: -0.75rem;
  padding-top: 13px;
  padding-top: 13px;
  padding-left: 0px;
  padding-right: 0px;
}
.container {
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 1px;
  width: 100%;
  padding-bottom: 10px;
}
.date {
  padding-right: 10px;
  color: black;
}
.border {
  border-bottom: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
img {
  height: auto;
  max-width: 59px;
}
.align {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.font {
  font-family: sans-serif;
}
.add_flex_align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item_namealign {
  padding-left: 8px;
}
.p {
  margin-top: -19px;
  /* padding-left: 10px; */
  font-size: 13px;
}
.column.is-mobile {
  display: flex;
}
.column {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: -0.75rem;
  padding-top: 13px;
  padding-bottom: 31px;
  padding-top: 0px;
  padding-bottom: 31px;
  padding-left: 0px;
  padding-right: 0px;
}
.breadcrumb-pagination {
  width: 100%;
  border-bottom: 1px solid #e1e6eb;
  text-align: center;
  float: left;
}
.breadcrumb-pagination div {
  display: inline-block;
  padding-right: 0px;
  padding-left: 0px;
}
.breadcrumb-pagination div span {
  /* margin: 0 auto; */
  display: block;
  border-radius: 5px;
  height: 30px;
  text-align: center;
  padding: 4px 0 0 0px;
  font-size: 22px;
  width: 69px;
}
.fntclr {
  color: black;
}
.fntclr2 {
  color: black;
  padding-left: 1px;
}
.fntclr3 {
  color: black;
  padding-left: 3px;
}
.Pending {
  color: blue;
}
.Shipped {
  color: skyblue;
}
.Delivered {
  color: green;
}
.Cancelled {
  color: red;
}
.circle span {
  background-color: gray;
  color: #fff;
}
.Pending span {
  background-color: blue;
  color: #fff;
}
.Shipped span {
  background-color: skyblue;
  color: #fff;
}
.Delivered span {
  background-color: green;
  color: #fff;
}
.Cancelled span {
  background-color: red;
  color: #fff;
}
.breadcrumb-pagination div p {
  text-align: center;
  line-height: 0;
  margin: 16px auto 25px;
  font-size: 13px;
}
.active1 {
  border-bottom: 2px solid blue;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}

.payment {
  padding-right: 10px;
  margin-top: 10px;
  font-size: 14px;
  letter-spacing: 0;
}
.active2 {
  border-bottom: 2px solid skyblue;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active3 {
  border-bottom: 2px solid green;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active4 {
  border-bottom: 2px solid red;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active span::before {
  content: '\2713';
}
p {
  padding-left: 0px;
  font-size: 13px;
  margin-top: 9px;
  color: #bd531e;
  font-weight: bold;
}
.svgsize {
  height: 16px;
  width: 21px;
}
</style>
