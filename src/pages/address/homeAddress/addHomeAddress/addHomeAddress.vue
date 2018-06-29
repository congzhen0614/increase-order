<template>
  <div class="add-home-address">
    <ul class="user-home-address">
      <li>
        <span>姓名</span>
        <input type="text" placeholder="请输入收货人姓名">
      </li>
      <li>
        <span>手机</span>
        <input type="text" placeholder="请输入您的手机号">
      </li>
      <li>
        <span>省市区</span>
        <img src="../../../../assets/link-icon.png"/>
        <!--<input type="text" placeholder="请选择地区" readonly>-->
        <p>
          <span>北京</span>
          <span>北京</span>
          <span>北京</span>
        </p>
      </li>
      <li>
        <span>地址</span>
        <div class="textarea" contenteditable="true"  placeholder="请输入您的详细地址"></div>
      </li>
    </ul>
    <div class="address-submit">完成</div>
  </div>
</template>

<script>
export default {
  name: 'add-home-address',
  components: {},
  data () {
    return {
      address: ''
    }
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
    @import './addHomeAddress.styl'
</style>
