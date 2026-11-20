<template>
  <div class="container">
    <div class="padding">
      <div class="row align-items-center">
        <div>
          <h1
            class="card border-0 shadow-lg bg"
            v-for="o in orders"
            :key="o._id"
            :title="`${o.name} => ${o.address}`"
            :type="getStyle(o)"
          >
            <div class="columns is-mobile ">
              <div class="breadcrumb-pagination">
                <h2>Name : {{ o.name }}</h2>
                <h3>Address:{{ o.address }}</h3>
                <h4>Total Amount:{{ o.amount.total }}</h4>
                <div
                  class="circle"
                  v-bind:class="{
                    active1: o.status == 'PENDING',
                    Pending: o.status == 'Pending'
                  }"
                  native-value="Pending"
                  @input="changeStatus()"
                  @click="update('Pending')"
                >
                  <span>1</span>
                  <p
                    class="fntclr"
                    v-bind:class="{ Pending: o.status == 'Pending' }"
                  >
                    Pending
                  </p>
                </div>
                <div
                  class="circle "
                  v-bind:class="{
                    active2: o.status == 'SHIPPED',
                    Shipped: o.status == 'Shipped'
                  }"
                  native-value="Shipped"
                  type="is-warning"
                  @input="changeStatus(o)"
                  @click="update('Shipped')"
                >
                  <span>2</span>
                  <p
                    class="fntclr"
                    v-bind:class="{ Shipped: o.status == 'Shipped' }"
                  >
                    Shipped
                  </p>
                </div>
                <div
                  class="circle"
                  v-bind:class="{
                    active3: o.status == 'DELIVERED',
                    Delivered: o.status == 'Delivered'
                  }"
                  native-value="Delivered"
                  type="is-success"
                  @input="changeStatus(o)"
                  @click="update('Delivered')"
                >
                  <span class="margin">3</span>
                  <p
                    class="fntclr2"
                    v-bind:class="{ Delivered: o.status == 'Delivered' }"
                  >
                    Delivered
                  </p>
                </div>
                <div
                  class="circle"
                  v-bind:class="{
                    active4: o.status == 'CANCELLED',
                    Cancelled: o.status == 'Cancelled'
                  }"
                  native-value="Cancelled"
                  type="is-danger"
                  @input="changeStatus(o)"
                  @click="update('Cancelled')"
                >
                  <span class="margin">4</span>
                  <p
                    class="fntclr3"
                    v-bind:class="{ Cancelled: o.status == 'Cancelled' }"
                  >
                    Cancelled
                  </p>
                </div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div>
                <div
                  class="rows is-mobile"
                  v-for="(i, ix) in o.items"
                  :key="ix"
                >
                  <div class="media-content">
                    <div class="content">
                      <strong class="front">{{ ix + 1 }} - {{ i.name }}</strong>
                      <small class="front"
                        >{{ i.price | currency }} (<strong>{{ i.qty }}</strong
                        >)</small
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from '~/service/firebase'
export default {
  props: ['status'],

  firestore() {
    return {
      orders: db.collection('orders').orderBy('createdAt', 'desc')
    }
  },

  methods: {
    update: function(updated) {
      alert('Do you want to submit for sure?')
      console.log(updated)
    },
    showMessage: function() {},

    changeStatus(o) {
      db.collection('orders')
        .doc(o['.key'])
        .update({
          status: o.status,
          updatedAt: new Date()
        })
    },
    getStyle(o) {
      let style = ''
      if (o.status === 'Cancelled') {
        style = 'is-danger'
      } else if (o.status === 'Delivered') {
        style = 'is-success'
      } else if (o.status === 'Shipped') {
        style = 'is-warning'
      }
      return style
    }
  }
}
</script>
<style scoped>
.margin {
  margin-left: 19px;
}
h2,
h3,
h4 {
  font-size: 16px;
  text-align: -webkit-left;
  color: cadetblue;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.border-0 {
  border: 0 !important;
}
.shadow-lg {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.padding {
  padding: 0rem !important;
}
.bg {
  background: whitesmoke;
}
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.small {
  font-size: 12px;
}
.columns.is-mobile {
  display: flex;
}
.columns {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  margin-top: -0.75rem;
  padding-top: 13px;
  padding-bottom: 31px;
  padding-top: 13px;
  padding-bottom: 31px;
  padding-left: 0px;
  padding-right: 0px;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
}
.front {
  font-size: 15px;
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
  margin: 0 auto;
  display: block;
  border-radius: 100%;
  height: 30px;
  width: 36px;
  padding: 6px 0 0 0px;
  font-size: 20px;
}
.fntclr {
  color: black;
  letter-spacing: 2px;
}
.fntclr2 {
  color: black;
  letter-spacing: 1px;
  padding-left: 3px;
}
.fntclr3 {
  color: black;
  letter-spacing: 1px;
  padding-left: 7px;
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
  margin: 30px auto 25px;
  font-size: 11px;
}
.active1 p {
  border-bottom: 2px solid blue;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active2 p {
  border-bottom: 2px solid skyblue;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active3 p {
  border-bottom: 2px solid green;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active4 p {
  border-bottom: 2px solid red;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
}
.active span::before {
  content: '\2713';
}
h1 {
  font-family: Karla, Roboto, sans-serif;
  letter-spacing: 0px;
}
</style>
