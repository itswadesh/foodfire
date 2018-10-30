<template>
  <div class="align">
    <a v-if="!checkCart({_id:product._id})" @click="addToCart({_id:product._id,name:product.name,img:product.img,price:product.price,qty:1});">
      <button class="button button.is-danger buttonrounded ">
        <h2 class="cartposition">Add to Cart</h2>
      </button>
    </a>

    <div class="size1" v-else>
      <a class="button1 button.is-danger buttonrounded1" @click="addToCart({_id:product._id,name:product.name,img:product.img,price:product.price,qty:1});">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </a>
      <span class="size2">{{getQty({_id:product._id})}}</span>
      <a class="button1 buttonrounded1" @click="addToCart({_id:product._id,name:product.name,img:product.img,price:product.price,qty:-1});">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24">
          <path d="M19 13H5v-2h14v2z"></path>
          <path d="M0 0h24v24H0z" fill="none">
          </path>
        </svg>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: ["product"],
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
<style>
.size1 {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
}
.size2 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}
.buttonrounded1 {
  border-radius: 50px;
  width: 31px;
}
.button.is-danger {
  border-color: transparent;
  color: #fff;
}
.button1 {
  border: 1px solid transparent;
  border-color: lightgray;
  border-width: 1px;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  background: #f5f5f5;
}
.button1:hover {
  background: #ffdd57;
}
.button {
  border: 1px solid transparent;
  border-color: lightgray;
  background-color: white;
  border-width: 1px;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  padding: calc(0.375em - 1px) 0.75em;
  padding-bottom: 0px;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
}
.button:hover {
  background: #ff3860;
  color: #fff;
}
.buttonrounded {
  border-radius: 30px;
  width: 114px;
  height: 34px;
}
.align {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cartposition {
  padding-left: 5px;
  font-size: 13px;
  margin-top: 5px;
}

.plus {
  font-size: 25px;
  margin-top: -3px;
}
</style>

