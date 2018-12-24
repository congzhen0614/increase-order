<template>
  <div class="home-school-list">
    <div class="no-address-list" v-if="addressList.length === 0">
      <img src="../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
      <span v-if="!isLogin" class="go-login" @click="$router.push({path: '/mobileLogin'})">去登录</span>
    </div>
    <ul class="address-list" v-if="addressList.length > 0">
      <li v-for="(item, index) in addressList" :key="index" @click.stop="onClick(item)">
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
    <div class="add-adress" @click="onAppend">添加</div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'home-school-list',
  components: {},
  data () {
    return {
      addressList: [],
      isLogin: false
    }
  },
  created () {
    store.address = ''
    this.loadAddress()
  },
  mounted () {
  },
  computed: {},
  methods: {
    loadAddress () {
      this.$axios.addressList({adminId: localStorage.getItem('createId')}).then(res => {
        if (res.data.code === '0') {
          this.addressList = res.data.data
          this.isLogin = true
        } else if (res.data.code === '-6') {
          this.isLogin = false
        } else {
          this.isLogin = true
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
    onClick (item) {
      store.address = item
      this.$router.push({
        path: '/addHomeAndSchool'
      })
    },
    onAppend () {
      store.address = {}
      this.$router.push({
        path: '/addHomeAndSchool'
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './homeAndSchoolList.styl'
</style>
