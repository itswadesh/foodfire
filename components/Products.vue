<template>
  <div class="products head">
    <div
      class="product"
      :class="{ border: ix != 0 }"
      v-for="(p, ix) in products"
      :key="p['.key']"
    >
      <div class="image">
        <img v-lazy="p.img" alt="" />
      </div>
      <div class="content">
        <strong>{{ p.name }}</strong>
      </div>
      <div class="price-align">
        <div class="big">{{ p.price | currency }}</div>
        <cart-buttons
          :product="{
            _id: p['.key'] || p._id,
            name: p.name,
            img: p.img,
            price: p.price
          }"
          v-if="showcart"
        />
      </div>
    </div>
    <div
      class="webcard"
      :class="{ border: ix != 0 }"
      v-for="(p, ix) in products"
      :key="p['.key'] + 'x'"
    >
      <div class="webcolumn">
        <div class="image">
          <img img v-lazy="p.img" alt="" />
        </div>
        <div class="content">
          <div>
            <strong class="f-12">{{ p.name }}</strong>
          </div>
          <div class="webprice">
            <div class="big">{{ p.price | currency }}</div>
            <div>
              <cart-buttons
                :product="{
                  _id: p['.key'] || p._id,
                  name: p.name,
                  img: p.img,
                  price: p.price
                }"
                v-if="showcart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
const CartButtons = () => import('~/components/CartButtons')

export default {
  props: ['products', 'showcart'],

  components: { CartButtons },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart'
    })
  },
  computed: {
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: 'cart/checkCart',
      getQty: 'cart/getQty'
    })
  }
}
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
@media (min-width: 900px) and (max-width: 2000px) {
  .product {
    display: none;
  }
}
.content {
  flex: 1;
  margin-top: 5px;
}
@media (min-width: 900px) and (max-width: 2000px) {
  .content {
    margin-top: 1rem;
    text-align: left;
  }
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
.border {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
@media (min-width: 900px) and (max-width: 2000px) {
  .border {
    border-top: 0px;
  }
}
.price-align {
  text-align: right;
  margin-top: 5px;
}
.big {
  font-size: 1.5em;
  font-weight: 700;
}
@media (min-width: 900px) and (max-width: 2000px) {
  .big {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.head {
  position: relative;
  left: 0;
  right: 0;
  text-align: center;
  margin-bottom: 50px;
}
.webcolumn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 350px;
  padding: 10px;
}
.webcard {
  width: 350px;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  margin-top: 5px;
  border-radius: 6px;
  margin: 10px;
}
@media (min-width: 900px) and (max-width: 2000px) {
  .webcard {
    display: inline-block;
    flex-direction: row;
    justify-content: space-around;
  }
}
@media (min-width: 300px) and (max-width: 900px) {
  .webcard {
    display: none;
  }
}
.webprice {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.7rem;
}
.f-12 {
  font-size: 20px;
}
</style>
