<template>
  <div class="product-detail">
    <div class="detail-menu">
      <ul>
        <li :class="{active: type===1}" @click="clickChangeType(1)">商品详情</li>
        <li :class="{active: type===2}" @click="clickChangeType(2)">内容目录</li>
        <li :class="{active: type===3}" @click="clickChangeType(3)">出版信息</li>
      </ul>
    </div>
    <div class="info-content">
      <v-detail v-if="type===1"></v-detail>
      <v-directory v-if="type===2"></v-directory>
      <v-published v-if="type===3"></v-published>
    </div>
  </div>
</template>

<script>
import detail from './detail/detail.vue'
import directory from './directory/directory.vue'
import published from './published/published.vue'
export default {
  name: 'product-detail',
  components: {
    'v-detail': detail,
    'v-directory': directory,
    'v-published': published
  },
  data () {
    return {
      type: 0
    }
  },
  created () {
    this.type = parseInt(this.$route.query.type)
  },
  mounted () {
  },
  computed: {},
  methods: {
    clickChangeType (type) {
      this.type = type
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './product.styl'
</style>
