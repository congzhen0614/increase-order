<template>
  <div class="home-address">
    <div class="no-address-list" v-if="addressList.length===0">
      <img src="../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
    </div>
    <ul class="address-list" v-if="addressList.length>0">
      <li v-for="(item, index) in addressList" :key="index" @click.stop="selectAddress(item)">
        <div class="address-list-right">
          <img src="../../../assets/address-link-icon.png">
        </div>
        <div class="address-list-left">
          <div class="address-info">
            <span class="address-name">{{ item.name }}</span>
            <span class="address-phone">{{ item.phone }}</span>
          </div>
          <p class="address-content">{{ item.address }}</p>
        </div>
      </li>
    </ul>
    <div class="add-adress" @click.stop="addHomeAddress()">添加</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      addressList: []
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
  },
  computed: {},
  methods: {
    loadData () {
      this.$axios.addressList().then(res => {
        this.addressList = res.data.data
      }, err => {
        console.log(err)
      })
    },
    selectAddress (item) {
      this.$root.Bus.$emit('homeAddress', item)
      this.$router.go(-1)
    },
    addHomeAddress () {
      this.$router.push({
        path: '/addHomeAddress'
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './homeAddress.styl'
</style>
