<template>
  <div class="solicit-subscription-magazine">
    <header class="magazine-seek">
      <p><span>年龄区间</span><img src="../../../assets/pull-down-icon.png"></p>
      <p><span>杂志类别</span><img src="../../../assets/pull-down-icon.png"></p>
    </header>
    <ul class="magazine-list">
      <li v-for="item in lists" :key="item.id">
        <div class="picture">
          <img :src="item.logo">
        </div>
        <div class="content">
          <p class="title">{{ item.name }}</p>
          <p class="gift">
            <img src="../../../assets/gift-icon.png">
            {{ item.giftName }}
          </p>
          <p class="units">{{ item.feeUnit }}</p>
          <p class="amount">
            <img src="../../../assets/minus-icon.png">
            <span>0</span>
            <img src="../../../assets/add-icon.png">
          </p>
          <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-magazine',
  data () {
    return {
    }
  },
  props: {
    lists: {
      type: Array
    }
  },
  mounted () {
  },
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './magazine.styl'
</style>
