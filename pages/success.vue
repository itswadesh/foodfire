<template>

  <body>
    <div>
      <div>
        <nav-bar />
      </div>
    </div>
    <div class="container">
      <div class="card border-0 shadow-lg bg-gradient-warning">
        <div class="p-5">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <div class="pstn">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" class="svgwhite">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M19.77 5.03l1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 5.03m0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43 19.77 2.2z" /></svg>
                <h1 class="text-white">
                  Order Placed
                </h1>
                <p class="lead text-white mt-3">
                  <b>Amount to be paid: </b></p><br />
                <h1>{{$route.query.amount | currency}}</h1>
              </div>
            </div>
            <div class="col-lg-3 ml-lg-auto">
              <a type class="btn btn-block btn-white btn-lg btncontent">View Details
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  <path fill="none" d="M0 0h24v24H0V0z" /></svg>
              </a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 ml-lg-auto">
      <a type class="btn btn-block btn-white1 btn-lg btncontent">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svg2">
          <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
          <path d="M0 0h24v24H0z" fill="none" /></svg>
        <router-link to="/" class="btnclr">Restaurant Menu</router-link>
      </a></div>
    <!-- <router-link to="/my/orders" class="button is-dark">Find My Previous Orders</router-link> -->
  </body>
</template>
<script>
import { clearCart } from "@/config";
const NavBar = () => import("~/components/NavBar");

export default {
  async created() {
    try {
      if (clearCart) this.$store.commit("cart/clearCart", {});
    } catch (e) {}
  },
  components: { NavBar },
  head() {
    return {
      title: "Payment",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "This page receives payment status after payments made from payment gateway"
        }
      ]
    };
  }
};
</script>
<style scoped>
.svg2 {
  fill: white;
}
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
.pstn {
  padding-bottom: 20px;
  text-align: center;
}
.amount {
  font-weight: bold;
  color: red;
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
.p-5 {
  padding: 3rem !important;
}
.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
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
.mt-3 {
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
  padding: 0.875rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.col-lg-3 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 15px;
}
.col-lg-8 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.btncontent {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: #3273dc;
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
.shadow,
.profile-page .card-profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.svgwhite {
  fill: white;
  margin-left: -5px;
}
</style>
