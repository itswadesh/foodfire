<template>
  <b-message title="">
    <div class="columns is-mobile">
      <div class="column">
        <p class="grey">Delivery time</p>
        <p>60 minutes</p>
      </div>
      <div class="column">
        <p class="grey">Delivery free</p>
        <p>above 50 </p>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <p class="grey">Delivery hours</p>
        <p>11:30AM - 1:30AM</p>
      </div>
      <div class="column">
        <p class="grey">Minimum order</p>
        <p>{{0.000 | currency}}</p>
      </div>
    </div>
    <div class="columns">
      <center class="green"><b>Delivery is now open</b></center>
    </div>
  </b-message>
</template>
