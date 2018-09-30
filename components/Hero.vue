<template>
  <section class="hero is-medium is-primary is-bold" :class="!closed?'is-primary':'is-danger'">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          FoodFire
        </h1>
        <h2 class="subtitle">
          Delhi
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["closed"]
};
</script>

