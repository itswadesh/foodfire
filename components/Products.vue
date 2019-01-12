<template>
  <div class="products">
    <div
      class="product"
      :class="{'border':ix!=0}"
      v-for="(p,ix) in products"
      :key="p['.key']"
    >
      <div class="image">
        <img
          v-lazy="p.img"
          alt=""
        />
      </div>
      <div class="content">
        <strong>{{p.name}}</strong>
      </div>
      <div class="price-align">
        <div class="big">{{p.price | currency}}</div>
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
.products {
  margin: 0 1rem;
}
.product {
  align-items: flex-start;
  display: flex;
  text-align: left;
  padding-top: 1rem;
}
.pt3 {
  padding-top: 3px;
}
.content {
  flex: 1;
  margin-top: 5px;
}
strong {
  color: #363636;
  font-weight: 700;
}
.image {
  width: 104px;
}
.image img {
  border-radius: 50px;
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
.border {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
.price-align {
  text-align: right;
  margin-top: 5px;
}
.big {
  font-size: 1.5em;
  font-weight: 700;
}
h1 {
  font-size: 100%;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -1px;
}
</style>


