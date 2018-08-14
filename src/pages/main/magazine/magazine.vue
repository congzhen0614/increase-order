<template>
  <div class="solicit-subscription-magazine">
    <header class="magazine-seek">
      <p><span>年龄区间</span><img src="../../../assets/pull-down-icon.png"></p>
      <p><span>杂志类别</span><img src="../../../assets/pull-down-icon.png"></p>
    </header>
    <ul class="magazine-list">
      <li v-for="item in list" :key="item">
        <div class="picture">
          <img src="./4.jpg">
        </div>
        <div class="content">
          <p class="title">刊物名称刊物名称</p>
          <p class="gift">
            <img src="../../../assets/gift-icon.png">
            益智DIY万变串珠+弹射飞机+益智DIY万变串珠+弹射飞机
          </p>
          <p class="units">半年12期(2018.1~2018.6)</p>
          <p class="amount">
            <img src="../../../assets/minus-icon.png">
            <span>0</span>
            <img src="../../../assets/add-icon.png">
          </p>
          <p class="price">￥<span class="big">500</span>.00</p>
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
      list: [1, 2, 3, 4, 5, 6]
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './magazine.styl'
</style>
