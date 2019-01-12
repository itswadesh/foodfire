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
            <img
              src="~/static/logo.png"
              alt="FoodFire"
              height="28"
            >
          </router-link>
        </a>
      </div>
      <div class="iconcenter">
        <div class="iconalign1">
          <a
            role="button"
            class="navbaritem boxbtn"
            aria-label="menu"
            @click="go('/cart')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </a>
        </div>
        <div class="iconalign">
          <a
            role="button"
            class="navbaritem boxbtn"
            aria-label="menu"
            @click="go('/viewdetails')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>

</template>
  <script>
export default {
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
    <style>
.navbar-item img {
  max-height: 2.3rem;
}
.navbar-brand,
.navbar-tabs {
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
  width: 100%;
  height: 100%;
  padding-left: 24px;
  padding-right: 15px;
}
.iconalign1 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 33px;
}
.navbar.is-primary .navbar-brand > a.navbar-item:hover {
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
}
img {
  height: auto;
  max-width: 100%;
}
.navbar-item img {
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
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
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
/* .button {
  cursor: pointer;
  justify-content: center;
  padding: calc(0.375em - 1px) 0.75em;
  padding-bottom: 0px;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 0;
} */
.button:hover {
  background: #ff3860;
  color: #fff;
}
.button1 {
  border: 1px solid transparent;
  border-color: lightgray;
  border-width: 1px;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
}
.button1:hover {
  background: #ffdd57;
}
.size1 {
  display: flex;
  flex-direction: row;
}
.iconcenter {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 158px;
}
.boxbtn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.headeralign {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

    