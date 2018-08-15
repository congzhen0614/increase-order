<template>
  <div class="solicit-subscription-type">
    <ul>
      <li>
        <span>全部</span>
        <img src="../../../../assets/check-icon.png">
        <!--<img src="../../../../assets/checked-icon.png">-->
      </li>
      <li v-for="(item, index) in dataList" :key="index">
        <span>{{ item.name }}</span>
        <img src="../../../../assets/check-icon.png">
        <!--<img src="../../../../assets/checked-icon.png">-->
      </li>
    </ul>
    <div class="footer-button">
      <span>取消</span>
      <span>确定</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-type',
  components: {},
  data () {
    return {
      dataList: []
    }
  },
  created () {
  },
  mounted () {
    this.loadItemtypeList()
  },
  methods: {
    loadItemtypeList () {
      this.$axios.itemtypeList().then(res => {
        this.dataList = res.data.data
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'typeList.styl'
</style>
