<template>
  <nav
    role="navigation"
    aria-label="main navigation"
    class="navbar header has-shadow is-primary"
  >
    <div class="headeralign">
      <div class="navbar-brand">
        <a class="navbar-item a1">
          <router-link to="/">
            <img class="logo" src="/logo.png" alt="FoodFire" height="28" />
          </router-link>
        </a>
      </div>
      <div class="header-right navbar-item fx">
        <a role="button" href="https://github.com/itswadesh/foodfire">
          ⭐me @ GitHub
        </a>
        <a role="button" aria-label="menu">
          <img v-if="user" :src="user.avatar" @click="go('/my/profile')" />
          <img v-else class="img" src="/person.svg" @click="googleSignIn()" />
        </a>
        <a role="button" aria-label="menu" @click="go('/cart', false)">
          <img src="/bag.svg" />
        </a>
        <a
          v-if="user"
          role="button"
          aria-label="menu"
          @click="go('/my/orders', true)"
        >
          <img src="/orderstatus.svg" />
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    go(url, auth) {
      if (auth && !this.user) {
        this.googleSignIn()
      } else {
        this.$router.push(url)
      }
    },
    ...mapActions({
      googleSignIn: 'auth/googleSignIn'
    })
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    }
  }
}
</script>
<style scoped>
.header-right {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}
.header-right a {
  padding: 5px;
  color: white;
}
.navbar-item img {
  width: 24px;
  height: 24px;
  border-radius: 50px;
}
.navbar-brand {
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}
.navbar.has-shadow {
  box-shadow: 0 2px 0 0 #f5f5f5;
}
.navbar.is-primary {
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
}
.navbar {
  background-color: #fff;
  min-height: 3.25rem;
  z-index: 30;
}
.iconalign {
  display: flex;
  align-items: center;
  width: 92%;
  height: 100%;
  padding-left: 7px;
  padding-right: 14px;
}
.iconalign1 {
  display: flex;
  align-items: center;
  width: 78%;
  height: 100%;
  padding-left: 0px;
}
.iconalign2 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-top: 1px;
}
.navbar.is-primary .navbar-brand > a.navbar-item:hover {
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
}
.navbar-item img {
  width: 24px;
  height: 24px;
  max-width: 100%;
  border-radius: 50px;
  max-height: 1.75rem;
}
a {
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}
.navbar-menu {
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
  padding: 0.5rem 0;
  display: none;
}
.navbar-link,
a.navbar-item {
  cursor: pointer;
}
.navbar-item,
.navbar-link {
  color: #4a4a4a;
  padding: 0.5rem;
}
.a1 {
  display: flex;
  align-items: center;
}
.icon {
  width: 7rem;
  height: 7rem;
}
.shadow,
.profile-page .card-profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.button.is-danger {
  border-color: transparent;
  color: #fff;
}
.iconcenter {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 158px;
}
.boxbtn {
  width: 82%;
  height: 100%;
  display: flex;
  align-items: center;
}
.boxbtn1 {
  width: 67%;
  height: 100%;
  display: flex;
  align-items: center;
}
.headeralign {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 31px;
  margin-top: 3px;
}
/* .img {
  width: 34px;
  height: 37px;
  border-radius: 50px;
} */
</style>
