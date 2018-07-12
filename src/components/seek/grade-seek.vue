<template>
  <div class="grade-seek">
    <ul>
      <li v-for="(item, index) in dataList" :key="index" @click="clickSelect(item)">
        <span>{{ item.name }}</span>
        <img src="../../assets/link-icon.png">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'grade-seek',
  components: {},
  data () {
    return {
      dataList: [{
        name: '全部',
        id: 0
      }, {
        name: '1年级',
        id: 1
      }, {
        name: '2年级',
        id: 2
      }, {
        name: '3年级',
        id: 3
      }, {
        name: '4年级',
        id: 4
      }, {
        name: '5年级',
        id: 5
      }, {
        name: '6年级',
        id: 6
      }]
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    clickSelect () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .grade-seek
    > ul
      >li
        height 0.88rem
        line-height 0.88rem
        border-bottom 1px solid #E6E6E6
        > span
          display inline-block
          width 95%
          padding 0 0.2rem
          font-size 0.32rem
          color #333333
        > img
          width 0.16rem
          height 0.28rem
</style>
