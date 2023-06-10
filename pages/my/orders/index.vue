<template>
  <div>
    <center class="title">
      <strong class="font">My Order History</strong>
    </center>
    <Loading :active="!orders || !orders[0]" />
    <div
      v-if="!!user"
      v-for="o in orders"
      :key="o._id"
      :title="`${o.name} => ${o.address}`"
      :type="getStyle(o)"
      class="container"
    >
      <div class="card shadow-lg2">
        <div class="border">
          <div class="border">
            <h5>ORDER ID: {{ o['.key'] }}</h5>
          </div>

          <h1>{{ user.name }}</h1>
          <div class="add_date_align">
            <div>
              <h2>{{ o.address }}</h2>
            </div>
            <div class="date">
              <h4>
                Date:
                {{
                  o['createdAt'].toDate().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                }}
              </h4>
            </div>
          </div>
        </div>
        <div class="columns is-mobile border ">
          <div class="is-mobile" v-for="(i, ix) in o.items" :key="ix">
            <div class="media-content">
              <div class="align">
                <div class="item_namealign">{{ ix + 1 }}.</div>
                <div><img v-lazy="i.img" /></div>
                <div class="item_namealign">
                  <strong>{{ i.name }} </strong>
                </div>
                <div class="item_namealign">
                  <strong>{{ i.price | currency }}</strong> x
                  <strong>{{ i.qty }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add_date_align">
          <div>
            <h6>Order Status: {{ o.status }}</h6>
          </div>
          <div>
            <h3>Total: ₹{{ o.amount.total }}</h3>
          </div>
        </div>
        <router-link to="">
          <p>Need Help?</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const Loading = () => import('~/components/Loading')
import { db } from '~/service/firebase'
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user) return redirect('/')
  },
  components: { Loading },
  firestore() {
    return {
      orders: db
        .collection('orders')
        .where('email', '==', this.$store.state.auth.user.email)
        .orderBy('createdAt', 'desc')
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    }
  },
  methods: {
    changeStatus(o) {
      db.collection('orders')
        .doc(o['.key'])
        .update({
          status: o.status,
          updatedAt: new Date()
        })
    },
    getStyle(o) {
      let style = ''
      return style
    }
  }
}
</script>
<style scoped>
center {
  font-size: 23px;
  font-weight: 700;
  padding-top: 10px;
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
h1 {
  font-size: 14px;
  padding-left: 10px;
  color: #3a3ac9;
  letter-spacing: 0;
}
h2 {
  font-size: 12px;
  padding-left: 10px;
  color: #1cac7b;
  margin-top: 0px;
}
h3 {
  padding-right: 10px;
  margin-top: 6px;
}
h4 {
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0;
  margin-top: 1px;
}
h5 {
  text-align: -webkit-center;
  color: gray;
  padding-top: 0px;
  height: 0px;
  margin-top: 7px;
}
h6 {
  margin-top: 7px;
  padding-left: 10px;
  font-size: 13px;
}
.is-mobile.columns.is-mobile {
  display: flex;
  flex-direction: column;
  line-height: 1px;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
}
.columns {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-top: -0.75rem;
  padding-top: 13px;
  padding-top: 13px;
  padding-left: 0px;
  padding-right: 0px;
}
.container {
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 1px;
  width: 100%;
  padding-top: 10px;
}
.date {
  padding-right: 10px;
  color: black;
}
.border {
  border-bottom: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
img {
  height: auto;
  max-width: 59px;
}
.align {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.font {
  font-family: sans-serif;
}
.add_date_align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item_namealign {
  padding-left: 8px;
}
p {
  margin-top: -19px;
  padding-left: 10px;
  font-size: 13px;
}
</style>
