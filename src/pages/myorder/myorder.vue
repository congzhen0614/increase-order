<template>
  <div class="solicit-subscription-myorder">
    <v-nav :navName="'我的订单'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
export default {
  name: '',
  components: {
    'v-nav': nav
  },
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './myorder.styl'
</style>
