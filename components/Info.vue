<template>
  <div>
    <article class="message">
      <section class="message-body">
        <div>
          <div class="media-content">
            <div class="columns is-mobile">
              <div class="column">
                <p class="grey">Delivery time</p>
                <div>45 minutes</div>
              </div>
              <div class="column">
                <p class="grey">Delivery free</p>
                <div>above {{50 | currency}}</div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column">
                <p class="grey">Delivery hours</p>
                <div>11:30AM - 10:30PM</div>
              </div>
              <div class="column">
                <p class="grey">Minimum order</p>
                <div>{{0 | currency}}</div>
              </div>
            </div>
            <div class="green">
              <center>
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
  border-width: 0 0 0 0px;
  color: #4a4a4a;
  padding: 1.25em 1.5em;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  padding-top: 23px;
}
.columns.is-mobile {
  display: flex;
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
  margin-top:1.5rem;
}
p{
  margin-bottom:5px;
}
</style>




