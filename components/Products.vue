<template>
  <section class="section pt3">
    <div class="rows is-mobile">
      <article class="media mb-36" v-for="p in products" :key="p['.key']">
        <figure class="media-left">
          <p class="image is-128x128">
            <img :src="p.img">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <strong>{{p.name}}</strong>
            <!-- <small>{{p.description}}</small> <small></small> -->
          </div>
        </div>
        <div class="media-right">
          <h1 class="big">{{p.price | currency}}</h1>
          <cart-buttons :product="{_id:p['.key'],name:p.name,img:p.img,price:p.price}" />
        </div>
      </article>
    </div>
  </section>
</template>
<script>
const CartButtons = () => import("~/components/CartButtons");

export default {
  props: ["products"],
  components: { CartButtons }
};
</script>
<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.big {
  font-size: 1.5em;
  font-weight: bold;
}
</style>
