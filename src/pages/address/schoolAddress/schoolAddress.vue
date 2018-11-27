<template>
  <div class="school-address">
    <div class="no-address-list" v-if="addressList.length === 0">
      <img src="../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
      <span v-if="!isLogin" class="go-login" @click="goLogin">去登录</span>
    </div>
    <ul class="school-address-list" v-if="addressList.length > 0">
      <li v-for="(item, index) in addressList" :key="index" @click.stop="selectAddress(item)" v-if="item.seleted === 1">
        <img v-if="sex === 0" class="school-address-head" src="../../../assets/girls-icon.png"/>
        <img v-if="sex === 1" class="school-address-head" src="../../../assets/boys-icon.png"/>
        <img class="school-address-link" src="../../../assets/link-icon.png"/>
        <p class="school-address-title">
          <span class="child-name">{{ item.name }}</span>
          <img v-if="sex === 1" class="school-address-sex" src="../../../assets/boy-icon.png"/>
          <img v-if="sex === 0" class="school-address-sex" src="../../../assets/girl-icon.png"/>
        </p>
        <p class="school-address-content">{{ item.provinceName }}{{ item.cityName }}{{ item.regionName }}{{ item.schoolName }}{{ item.gradeName }}{{ item.defaultClassName }}</p>
      </li>
    </ul>
    <div class="add-adress" @click.stop="addHomeAddress()" v-if="isLogin">添加</div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'school-address',
  components: {},
  data () {
    return {
      addressList: [],
      isLogin: false,
      sex: 0
    }
  },
  created () {
    this.loadChildList()
  },
  methods: {
    loadChildList () {
      this.$axios.childList({id: localStorage.getItem('createId')}).then(res => {
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
      store.child = item
      this.$router.push({
        path: '/order',
        query: this.$route.query
      })
    },
    addHomeAddress () {
      this.$router.push({
        path: '/addSchoolAddress',
        query: this.$route.query
      })
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
  @import 'schoolAddress.styl'
</style>
