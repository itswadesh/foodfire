<template>
  <div>
    <nav-bar />
    <div class="bg-img">
      <div class="pstn ">
        <div>
          <section v-if="settings">
            <center>
              <label tabindex="0" class="switch">
                <input type="checkbox" true-value="true" value="false" v-model="settings.closed">
                <span class="check is-danger"></span>
                <div type="is-danger" @input="changeStatus(settings.closed)">
                  <span class="control-label">
                    <i v-if="settings.closed">Restaurant Closed</i>
                    <i v-else>Restaurant Open</i>
                  </span>
                </div>
              </label>
            </center>
          </section>
        </div>
      </div>
    </div>
    <orders />
  </div>
</template>
<script>
const Overlay = () => import("~/components/Overlay");
const Orders = () => import("~/components/Orders");
const Info = () => import("~/components/Info");
const Hero = () => import("~/components/Hero");
const NavBar = () => import("~/components/NavBar");
import { db } from "~/service/firebase";
export default {
  data() {
    return {};
  },
  firestore() {
    return {
      settings: db.collection("settings").doc("shop")
    };
  },
  methods: {
    changeStatus(closed) {
      db.collection("settings")
        .doc("shop")
        .update({
          closed: closed
        });
    }
  },
  async created() {},
  components: { Overlay, Orders, Info, Hero, NavBar }
};
</script>
<style>
.switch {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding-top: 20px;
}
/* .switch input[type="checkbox"] + .check {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 2.75em;
  height: 1.575em;
  padding: 0.2em;
  background: #b5b5b5;
  border-radius: 1em;
  transition: background 0.15s ease-out;
} */
.control-label {
  padding-left: 0.5em;
}
span {
  font-style: inherit;
  font-weight: inherit;
}
.switch input[type="checkbox"] {
  display: none;
}
input[type="checkbox"],
input[type="radio"] {
  vertical-align: baseline;
}
input {
  margin: 0;
}
.switch:hover input[type="checkbox"] + .check {
  background: hsla(0, 0%, 71%, 0.9);
}
.switch:hover input[type="checkbox"]:checked + .check.is-danger {
  background: rgba(255, 56, 96, 0.9);
}
.switch input[type="checkbox"] + .check {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 2.75em;
  height: 1.575em;
  padding: 0.2em;
  background: #b5b5b5;
  border-radius: 1em;
  transition: background 0.15s ease-out;
}
.switch input[type="checkbox"] + .check:before {
  content: "";
  border-radius: 1em;
  width: 1.175em;
  height: 1.175em;
  background: #f5f5f5;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.15s ease-out, width 0.15s ease-out;
  will-change: transform;
}
.switch input[type="checkbox"]:checked + .check:before {
  transform: translate3d(100%, 0, 0);
}
.pstn {
  padding-bottom: 20px;
  text-align: center;
}
</style>

