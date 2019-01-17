<template>
  <div>
    <div>
      <nav-bar />
    </div>
    <div class="container">
      <div class="card border-0 shadow-lg bg-gradient-warning">
        <div>
          <div class="row align-items-center">
            <div class="align">
              <div>
                <img src="/right.svg" />
                <h3 class="text-primary-light font-weight-bold">THANK YOU FOR YOUR ORDER</h3>
                <br>
                <p>
                  Your order has been received. Thank you. You will receive a confirmation call regarding availability before dispatch.  Order processing takes 3-4 working days. Please note items purchased at discount cannot be exchanged. For customer service, please contact care@foodfire.in
                </p>
                <p class="">Transaction ID: <span class="font-weight-bold">{{order['.key']}}</span></p>

                <div
                  class="address mb-3 "
                  v-if="order.address"
                >
                  <small>{{order.name}}</small><br />
                  <small>{{order.address}}</small><br />
                </div>

                <button
                  type="button"
                  class="btn-lg btn-primary font-weight-500  mb-5"
                  @click="$router.push('/my/orders')"
                >
                  My Orders Page
                  <i class="fi flaticon-right-chevron fs-2x "></i>
                </button>

              </div>
              <p class="lead text-white margin">
                <b>Amount to be paid: </b>
              </p><br />
              <h1 v-if="order.amount">{{order.amount.total | currency}}</h1>

              <div class="btn_align ">
                <a
                  type
                  class="btn btn-block btn-white btn-lg btncontent"
                >
                  <router-link :to="'/my/orders/'+orderNo">View Details</router-link>
                  <img src="/rightarrow.svg" />
                </a>
              </div>

              <div class="success-summary-container">
                <div class="card success-summary-card">
                  <div class="card-header">
                    <h4 class="card-title checkout-success-summary-title"> ORDER SUMMARY</h4>
                  </div>
                  <div class="card-body">

                    <div class="summary-products">
                      <nuxt-link
                        class="summary-product"
                        v-for="(p, index) in order.items"
                        :key="index"
                        :to="'/'+p.slug+'?id='+p.pid"
                      >
                        <div class="summary-product-img-container">
                          <img
                            v-lazy="p.img"
                            alt=""
                            class=" img-fluid summary-product-img"
                          >
                        </div>
                        <div class="summary-product-detail">
                          <p class="summary-product-title mb-3 text-gray-darker fs-2x">{{ p.name }}</p>
                          <span class="font-weight-500">{{ p.price | currency }}</span>
                        </div>
                      </nuxt-link>
                    </div>

                    <div
                      class="summary-total text-center mb-3"
                      v-if="order && order.amount"
                    >
                      <h4 class="font-weight-600">
                        <span class="text">Total Amount: </span>
                        <span class="total">{{order.amount.total | currency}}</span>
                      </h4>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn_align1 ">
      <a
        type
        class="btn btn-block btn-white1 btn-lg btncontent"
      >
        <img src="/backarrow.svg" />
        <router-link
          to="/"
          class="btnclr"
        >Restaurant Menu</router-link>
      </a></div>
    <!-- <router-link to="/my/orders" class="button is-dark">Find My Previous Orders</router-link> -->
  </div>
</template>
<script>
import { clearCart } from "@/config";
const NavBar = () => import("~/components/NavBar");
import { db } from "~/service/firebase";
export default {
  components: { NavBar },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  firestore() {
    return {
      order: db.collection(`orders`).doc(this.$route.query.id)
    };
  },
  async asyncData({ redirect, store, route }) {
    store.commit("cart/clearCart", {});
    return { orderNo: route.query.id };
  },
  methods: {
    cancelOrder() {
      console.log("Cancel order  requested");
    }
  },
  head() {
    return {
      title: "Order Success",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Order placed successfully"
        }
      ]
    };
  }
};
</script>
<style scoped>
.btnclr {
  color: white;
  text-decoration: none;
}
.btn-white1 {
  color: #212529;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.container {
  width: 100%;
  padding-top: 21px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.bg-gradient-warning {
  background: linear-gradient(87deg, #699b66 0, #68ea6c 100%) !important;
}
.border-0 {
  border: 0 !important;
}
.shadow-lg {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
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
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
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
.text-white {
  color: #fff !important;
}
.lead {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.7;
  margin-top: 1.5rem;
}
.margin {
  margin-top: 1rem !important;
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
  padding: 4px;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.btn_align {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.btn_align1 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 15px;
}
.align {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding: 10px;
  text-align: center;
}
.btncontent {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
h1 {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1px;
  color: #32325d;
  font-size: 20px;
}
</style>
