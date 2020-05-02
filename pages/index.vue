<template>
  <div>
    <Loading :active="!settings || !settings[0]" />
    <div v-if="settings[0]">
      <Hero :closed="settings[0].closed" />
      <Info />
      <Skeleton v-if="!products" />
      <Products :products="products" :showcart="true" />
      <Overlay :closed="settings[0].closed" />
      <cart-bar />
    </div>
  </div>
</template>
<script>
const Loading = () => import('~/components/Loading')
const Skeleton = () => import('~/components/Skeleton')
const Overlay = () => import('~/components/Overlay')
const Products = () => import('~/components/Products')
const Info = () => import('~/components/Info')
const Hero = () => import('~/components/Hero')
const CartBar = () => import('~/components/CartBar')
import { db } from '~/service/firebase'
export default {
  data() {
    return {
      loading: false,
      closed: true,
      settings: [],
      products: []
    }
  },
  firestore() {
    return {
      settings: db.collection('settings'),
      products: db.collection('products')
    }
  },
  methods: {},
  async created() {},
  components: { Loading, Skeleton, Overlay, Products, Info, Hero, CartBar }
}
</script>
