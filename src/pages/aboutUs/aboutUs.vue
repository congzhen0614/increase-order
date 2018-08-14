<template>
  <div class="solicit-subscription-aboutus">
    <v-nav :navName="'了解我们'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
export default {
  name: 'solicit-subscription-aboutus',
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
    @import './aboutus.styl'
</style>
