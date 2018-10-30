<template>
  <div style="background-color: #fefcfc;">
    <div>
      <div class="card shadow-lg--hover topposition shadow" v-for="p in products" :key="p['.key']">
        <div class="card-body">
          <div class="px-3">
            <div class="flex ">
              <div>
                <div class="imgsize">
                  <img :src="p.img">
                </div>
              </div>
              <div class="mdl-algn">
                <h1 class="text-success">{{p.name}}
                </h1>
                <P class="description">
                  <small>{{p.description}}</small>
                </P>
              </div>
              <div class="alignprice">
                <h2>{{p.price | currency}}</h2>
                <cart-buttons :product="{_id:p['.key'] || p._id,name:p.name,img:p.img,price:p.price}" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
const CartButtons = () => import("~/components/CartButtons");

export default {
  props: ["products"],

  components: { CartButtons },
  methods: {
    ...mapActions({
      addToCart: "cart/addToCart"
    })
  },
  computed: {
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: "cart/checkCart",
      getQty: "cart/getQty"
    })
  }
};
</script>

<style scoped>
.description {
  margin-top: 4px;
  color: #ccc;
  font-size: 12px;
}
.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}
.px-3 {
  padding-left: 1rem !important;
}
.imgsize {
  width: 128px;
  height: 90px;
  padding-left: 0px;
}

.text-success {
  color: #2dce89 !important;
}
.flex {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
}

.alignprice {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 0.3;
  color: #32325d;
  font-size: 14px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.topposition {
  margin-top: 7.1px !important;
}
.shadow,
.profile-page .card-profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
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
h1 {
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 400;
  font-family: inherit;
}
</style>


