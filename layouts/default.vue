<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>
<script>
const Header = () => import('~/components/Header')

export default {
  components: { Header }
}
</script>
