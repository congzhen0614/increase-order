<template>
  <div class="solicit-subscription-shoppingcar">
    <v-nav :navName="'购物车'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
export default {
  name: 'solicit-subscription-shoppingcar',
  components: {
    'v-nav': nav
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './shoppingcar.styl'
</style>
