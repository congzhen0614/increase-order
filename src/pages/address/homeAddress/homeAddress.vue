<template>
  <div class="home-address">
    <div class="no-address-list" v-if="addressList.length === 0">
      <img src="../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
      <span v-if="!isLogin" class="go-login" @click="goLogin">去登录</span>
    </div>
    <ul class="address-list" v-if="addressList.length > 0">
      <li v-for="(item, index) in addressList" :key="index" @click.stop="selectAddress(item)" v-if="item.selected === 1 || isMaga">
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
    <div v-if="isLogin" class="add-adress" @click.stop="addHomeAddress()">添加</div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      isMaga: this.$route.query.isMaga === 'maga',
      addressList: [],
      serviceArea: '',
      isLogin: false
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
    selectAddress (item) {
      if (this.isMaga) {
        store.address = item
      } else {
        store.bookAddress = item
      }
      this.$router.push({
        path: '/order',
        query: this.$route.query
      })
    },
    addHomeAddress () {
      if (this.isMaga) {
        this.$router.push({
          path: '/addMagaAddress'
        })
      } else {
        this.$router.push({
          path: '/addHomeAddress'
        })
      }
    },
    goLogin () {
      this.$router.push({
        path: '/mobileLogin'
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'homeAddress.styl'
</style>
