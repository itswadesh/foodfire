<template>
  <div>
    <article class="message">
      <section class="message-body">
        <div>
          <div class="media-content">
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
              <center class="green">
                <b>Delivery is now open</b>
              </center>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.message {
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 1rem;
}

.message-body {
  border-radius: 4px;
  border: solid #dbdbdb;
  border-width: 0 0 0 4px;
  color: #4a4a4a;
  padding: 1.25em 1.5em;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
}
.columns.is-mobile {
  display: flex;
  padding-left: 50px;
}
.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
}
.grey {
  color: grey;
}

.green {
  color: green;
}
</style>




