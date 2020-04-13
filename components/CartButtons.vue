<template>
  <div class="align">
    <div
      v-if="!checkCart({ _id: product._id })"
      @click="
        addToCart({
          _id: product._id,
          name: product.name,
          img: product.img,
          price: product.price,
          qty: 1
        })
      "
    >
      <button class="button1 buttonrounded1 btnalign">
        <img src="/plus.svg" />
      </button>
    </div>
    <div v-else>
      <div class="size1">
        <button
          class="button1 buttonrounded1 "
          @click="
            addToCart({
              _id: product._id,
              name: product.name,
              img: product.img,
              price: product.price,
              qty: -1
            })
          "
        >
          <img src="/minus.svg" />
        </button>
        <span class="size2">{{ getQty({ _id: product._id }) }}</span>
        <button
          class="button1 button.is-danger buttonrounded1 btnplus-clr"
          @click="
            addToCart({
              _id: product._id,
              name: product.name,
              img: product.img,
              price: product.price,
              qty: 1
            })
          "
        >
          <img src="/plus.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  props: ['product'],
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
      checkviewdetails: 'viewdetails/checkviewdetails',
      getQty: 'cart/getQty'
    })
  }
}
</script>
<style scoped>
.size1 {
  display: flex;
  flex-direction: row;
}
.size2 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.buttonrounded1 {
  border-radius: 50px;
  width: 33px;
}
.button.is-danger {
  border-color: transparent;
  color: #fff;
}
.button1 {
  border: 1px solid transparent;
  border-width: 1px;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  background: #f5f5f5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btnplus-clr {
  background: #ffdd57;
}
.button1:hover {
  background: #ffdd57;
}
.button {
  border: 1px solid transparent;
  border-width: 1px;
  color: #32325d;
  background-color: white;
  cursor: pointer;
  justify-content: center;
  padding: calc(0.375em - 1px) 0.75em;
  padding-bottom: 0px;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.button:hover {
  background: #ff3860;
  color: #fff;
}
.buttonrounded {
  border-radius: 15px;
  height: 34px;
  border-left-width: 2px;
}
.align {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
/* .plus {
  font-size: 25px;
  margin-top: -3px;
} */
.cart-icon {
  padding-bottom: 3px;
  padding-left: 5px;
}
/* .center {
  display: flex;
  flex-direction: row;
  align-items: center;
} */
.addalign {
  padding-top: 4px;
}
</style>
