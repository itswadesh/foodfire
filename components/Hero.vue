<template>

  <body>
    <!-- <div>
      <div>
        <img src="~/static/hero.jpeg" />
        <div class="chicname">
          <p><strong>
              Chicster</strong>
          </p>
        </div>
      </div>
    </div> -->
  </body>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      props: ["closed"]
    };
  }
};
</script>

<style scoped>
.chicname {
  padding-left: 37px;
  margin-top: -90px;
  padding-bottom: 13px;
  font-size: 25px;
  color: snow;
}
</style>



