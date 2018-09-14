<template>
  <div class="home-address">
    <div class="no-address-list" v-if="addressList.length===0">
      <img src="../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
    </div>
    <ul class="address-list" v-if="addressList.length>0">
      <li v-for="(item, index) in addressList" :key="index" @click.stop="selectAddress(item)">
        <div class="address-list-right">
          <img src="../../../assets/link-icon.png"/>
        </div>
        <div class="address-list-left">
          <div class="address-info">
            <span class="address-name">{{ item.name }}</span>
            <span class="address-phone">{{ item.mobile }}</span>
          </div>
          <p class="address-content">{{ item.provinceName }}{{ item.cityName }}{{ item.regionName }}{{ item.address }}</p>
        </div>
      </li>
    </ul>
    <div class="add-adress" @click.stop="addHomeAddress()">添加</div>
  </div>
</template>

<script>
import store from '@/store/store.js'
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
    this.loadAddress()
  },
  computed: {},
  methods: {
    loadAddress () {
      this.$axios.addressList().then(res => {
        if (res.data.code === '0') {
          this.addressList = res.data.data
        } else {
          this.Toast.fail({
            title: res.data.msg
          })
        }
      }, err => {
        this.Toast.fail({
          title: err
        })
      }).catch(err => {
        this.Toast.fail({
          title: err
        })
      })
    },
    selectAddress (item) {
      store.address = item
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
    @import 'homeAddress.styl'
</style>
