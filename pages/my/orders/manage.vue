<template>
  <div>
    <nav-bar />
    <div class="pstn">
<img src="/truck.svg" />
      <h4 class="textalgn">
        Order History
      </h4>
      <br />
    </div>

    <!-- <orders :address="false" /> -->
    <div class="container">
      <div class="padding">
        <div class="row align-items-center">
          <div class="alignment">
            <h1
              class="card border-0 shadow bg"
              v-for="o in orders"
              :key="o._id"
              :title="`${o.name} => ${o.address}`"
              :type="getStyle(o)"
            >
              <div class="columns is-mobile ">
                <div class="breadcrumb-pagination">
<div
                    class="circle"
                    v-bind:class="{active1: o.status=='PENDING',Pending:o.status=='Pending'}"
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
                    class="circle "
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
                      class="fntclr2"
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
                      class="fntclr3"
                      v-bind:class="{Cancelled:o.status=='Cancelled'}"
                    > Cancelled</p>
                  </div>

                </div>
              </div>
              <div class="columns is-mobile">
                <div>
                  <div
                    class="rows is-mobile"
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
                 <div>
              </div>
              </div>
              <div class="amnt_mrgn">
                <h4>Total Amount: {{o.amount.total}}</h4>
                </div>
<div class="shipping_mrgn">
                <p>Shipping Details: </p>
              </div>
              <div class="p_bottom">
                <h2> {{o.name}}</h2>
                <h3>{{o.address}}</h3>
                </div>
              
              <div>
                <button class="cancelbtn">Cancel My Order</button>
              </div>
            </h1>
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
p
{
  font-family: Roboto-Medium,Droid Sans,HelveticaNeue-Medium,Helvetica Neue Medium,Arial,Lucida Grande,sans-serif;
  color: #878787;
  font-size: 12px;
  line-height: 12px;
}

.margin {
  margin-left: 19px;
}
h2 {
 
  text-align: -webkit-left;
  font-size: 16px;
    margin-bottom: 10px;
    font-weight: 700;
}
h3 {
  text-align: -webkit-left;
  color: #3baf18;
      margin: 0;
    padding: 0;
    border: 0;
    font-size: 10px;
    font-weight: normal;
    vertical-align: baseline;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}
h4 {
  font-size: 16px;
  
  color: black;
  padding-left: 20px;
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
.shadow {
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
.alignment {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
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
.shipping_mrgn {
  border-top: 1px solid #dee2ed;
  border-bottom: 1px solid #dee2ed;
  padding-top: 0px;
}
.amnt_mrgn {
  border-top: 1px solid #dee2ed;
  padding-top: 0px;
}
.p_bottom
{
  padding-bottom: 10px;
  padding-left: 20px;
}
.cancelbtn {
  font-family: Karla, Roboto, sans-serif;
  width: 100%;
  display: block;
  padding: 0px;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  background: linear-gradient(87deg, #fa4040 0, #fbbe40 100%) !important;
  border-color: #fff;
  color: #fff;
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
.active1 {
  border-bottom: 2px solid blue;
  padding-bottom: 27px;
  margin-bottom: 0px !important;
  font-weight: 700;
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
.textalgn {
  color: #212529 !important;
  padding-top: 0px;
  font-size: 14px;
  text-align: -webkit-center;
}
</style>
