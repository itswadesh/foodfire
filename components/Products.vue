<template>
  <div class="products">
    <div class="product" :class="{'border':ix!=0}"
      v-for="(p,ix) in products"
      :key="p['.key']"    >
                <p class="image">
                  <img :src="p.img" alt=""/>
                </p>
              <div class="content">
                <strong>{{p.name}}</strong>
            </div>
            <div class="price-align ">
              <div>
                <h1 class="big">{{p.price | currency}}</h1>
              </div>
                <cart-buttons
                  :product="{_id:p['.key'] || p._id,name:p.name,img:p.img,price:p.price}"
                  v-if="showcart"
                />
            </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
const CartButtons = () => import("~/components/CartButtons");

export default {
  props: ["products", "showcart"],

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
.products{
  margin:0 1rem;
}
.product {
  align-items: flex-start;
  display: flex;
  text-align: left;
  padding-top:1rem;
}
.mb-36 {
  /* margin-bottom: -36px; */
}
.pt3 {
  padding-top: 3px;
}
.content {
  flex:1;
}
strong {
  color: #363636;
  font-weight: 700;
  font-family: Karla, Roboto, sans-serif;
}
.image {
  display: block;
  width: 104px;
  position: relative;
}
.hero-body,
.section {
  padding: 0rem 1.5rem;
}
article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}
figure {
  margin: 0;
  padding: 0;
}
media-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.border{
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
.big {
  font-size: 1.5em;
  font-weight: 700;
}
h1 {
  font-size: 100%;
  font-weight: 400;
  font-family: Karla, Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: -1px;
}
.price-align {
  text-align:right;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
}
</style>


