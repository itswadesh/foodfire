<template>
  <div>
    <nav-bar />
    <div class="pstn">
      <img src="truck.svg" />
      <h4 class="text-white">
        Order Status
      </h4>
      <br />
    </div>

    <!-- <orders :address="false" /> -->
    <div class="container">
      <div class="p-5">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div
              class="card border-0 shadow-lg bg"
              v-for="o in orders"
              :key="o._id"
              :title="`${o.name} => ${o.address}`"
              :type="getStyle(o)"
            >
              <div class="columns is-mobile ">
                <div class="breadcrumb-pagination">
                  <h2> {{o.name}}</h2>
                  <div
                    class="circle"
                    v-bind:class="{active1 : o.status=='PENDING',Pending:o.status=='Pending'}"
                    native-value="Pending"
                    @input="changeStatus(o)"
                  >
                    <span>1</span>
                    <p
                      class="fntclr"
                      v-bind:class="{Pending:o.status=='Pending'}"
                    >Pending</p>
                  </div>
                  <div
                    class="circle"
                    v-bind:class="{active2: o.status=='SHIPPED',Shipped:o.status=='Shipped'}"
                    native-value="Shipped"
                    type="is-warning"
                    @input="changeStatus(o)"
                  >
                    <span>2</span>
                    <p
                      class="fntclr"
                      v-bind:class="{Shipped:o.status=='Shipped'}"
                    >Shipped</p>
                  </div>
                  <div
                    class="circle"
                    v-bind:class="{active3: o.status=='DELIVERED',Delivered:o.status=='Delivered'}"
                    native-value="Delivered"
                    type="is-success"
                    @input="changeStatus(o)"
                  >
                    <span class="margin">3</span>
                    <p
                      class="greenclr"
                      v-bind:class="{Delivered:o.status=='Delivered'}"
                    >Delivered</p>
                  </div>
                  <div
                    class="circle"
                    v-bind:class="{active4: o.status=='CANCELLED',Cancelled:o.status=='Cancelled'}"
                    native-value="Cancelled"
                    type="is-danger"
                    @input="changeStatus(o)"
                  >
                    <span class="margin">4</span>
                    <p
                      class="redclr"
                      v-bind:class="{Cancelled:o.status=='Cancelled'}"
                    > Cancelled</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  v-for="(i,ix) in o.items"
                  :key="ix"
                >
                  <div class="media-content">
                    <div class="content">
                      <strong class="front">{{ix+1}} - {{i.name}}</strong>
                      <small class="front">{{i.price | currency}} (<strong>{{i.qty}}</strong>)</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
const NavBar = () => import("~/components/NavBar");
const Orders = () => import("~/components/Orders");
import { db } from "~/service/firebase";
export default {
  props: ["products", "status", "PENDING", "DELIVERED", "SHIPPED", "CANCELLED"],
  firestore() {
    return {
      orders: db.collection("orders").orderBy("createdAt", "desc")
    };
  },

  data() {
    return {
      loading: false
    };
  },
  components: { NavBar, Orders },

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
.margin {
  margin-left: 19px;
}
h2 {
  font-size: 16px;
  text-align: -webkit-left;
  color: cadetblue;
}
h3 {
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
.p-5 {
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
.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
}
.col-lg-8 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.box {
  border: 1px solid #b5b5b5;
  background-color: aliceblue;
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
button {
  cursor: pointer;
  height: 45px;
  width: 91px;
}
body {
  background-color: #f8f9fb;
  padding: 27px 0 65px 0px;
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial,
    "Lucida Grande", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
}
.clearfix {
  clear: both;
  min-height: 15px;
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
.greenclr {
  color: black;
  letter-spacing: 1px;
  padding-left: 3px;
}
.redclr {
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
  content: "\2713";
}
h1 {
  font-family: Karla, Roboto, sans-serif;
  letter-spacing: 0px;
}
.pstn {
  padding-bottom: 20px;
  text-align: center;
  padding-top: 16px;
}
.text-white {
  color: #212529 !important;
  padding-top: 0px;
  font-size: 14px;
}
.btn {
  position: relative;
  text-transform: uppercase;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  will-change: transform;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-white {
  color: #212529;
  background-color: #fff;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn-lg {
  padding: 0.875rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.col-lg-3 {
  position: relative;
  width: 100%;

  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 10px;
}

.btncontent {
  display: flex;
  justify-content: center;
  align-items: center;
}
.svg {
  margin-left: -5px;

  padding-bottom: 10px;
}
.svg2 {
  fill: white;
}
.btnclr {
  color: white;
  text-decoration: none;
  font-size: 15px;
}
.btn-white1 {
  color: #212529;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
