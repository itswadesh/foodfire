<template>
    <div>
        <a class="button is-danger is-rounded" v-if="!checkCart({_id:product._id})" @click="addToCart({_id:product._id,name:product.name,img:product.img,price:product.price,qty:1});">
            <span class="icon is-big">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    <path d="M0 0h24v24H0z" fill="none" /></svg>
            </span>
        </a>
        <div v-else class="row">
            <a class="button is-warning is-rounded" @click="addToCart({_id:product._id,name:product.name,img:product.img,price:product.price,qty:1});">
                <span class="icon is-small">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        <path d="M0 0h24v24H0z" fill="none" /></svg>
                </span>
            </a>
            <span>{{getQty({_id:product._id})}}</span>
            <a class="button is-rounded" @click="addToCart({_id:product._id,name:product.name,img:product.img,price:product.price,qty:-1});">
                <span class="icon is-small">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M19 13H5v-2h14v2z" />
                        <path d="M0 0h24v24H0z" fill="none" /></svg>
                </span>
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

