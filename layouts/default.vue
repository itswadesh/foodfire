<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            src="~static/logo.png"
            alt="FoodFire"
            height="28">
        </a>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="showMenu=showMenu?false:true">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
      </div>
      <div class="navbar-menu" :class="{'is-active':showMenu}">
        <div class="navbar-end">
          <a class="navbar-item" @click="go('/orders');showMenu=false">
            <h3>Orders</h3>
          </a>
          <b-dropdown position="is-bottom-left" v-if="!!user">
            <a class="navbar-item" slot="trigger">
              <span>{{user.name}}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>

            <b-dropdown-item>
              <div class="modal-card" style="width:100px;" @click="googleSignOut();showMenu=false">
                Logout
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

    </nav>
    <section class="main-content columns">
      <div class="container column is-12">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showMenu: false
    };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    ...mapActions({
      googleSignOut: "auth/googleSignOut"
    }),
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.navbar-item img {
  max-height: 2.3rem;
}
</style>
