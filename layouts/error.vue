<template>
  <div>
    <template v-if="error.statusCode === 404">
      <div class="fx">
        <div class="text-md-center">
          <h1>404</h1>
          <h2 class="my-3 headline ">Sorry, page not found</h2>
          <div>
            <button class="button" @click="goHome">Go Home</button>
          </div>
        </div>
      </div>
    </template>
    <template v-if="error.statusCode === 500">
      <div class="fx">
        <div class="text-md-center">
          <h1>500</h1>
          <h2 class="my-3 headline ">Sorry, an error occured.</h2>
          <div>
            <button class="button" @click="goHome">Go Home</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['error'],
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    }
  },
  layout: 'default' // you can set a custom layout for the error page
}
</script>

<style scoped lang="css">
.fx {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
.button {
  font-family: Karla, Roboto, sans-serif;
  text-transform: initial;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
  border-color: #fb6340;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
}
</style>
