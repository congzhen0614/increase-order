<template>
  <div class="school-address">
    <div class="no-address-list" v-if="addressList.length===0">
      <img src="../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
    </div>
    <ul class="school-address-list" v-if="addressList.length>0">
      <li v-for="(item, index) in addressList" :key="index" @click.stop="selectAddress(item)">
        <img class="school-address-head" src="../../../assets/avatar.jpg"/>
        <img class="school-address-link" src="../../../assets/link-icon.png"/>
        <p class="school-address-title">
          <span class="child-name">{{ item.name }}</span>
          <img v-if="sex===0" class="school-address-sex" src="../../../assets/boy-icon.png"/>
          <img v-if="sex===1" class="school-address-sex" src="../../../assets/girl-icon.png"/>
        </p>
        <p class="school-address-content">{{ item.address }}</p>
      </li>
    </ul>
    <div class="add-adress" @click.stop="addHomeAddress()">添加</div>
  </div>
</template>

<script>
export default {
  name: 'school-address',
  components: {},
  data () {
    return {
      addressList: [],
      sex: 0
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
      this.$root.Bus.$emit('schoolAddress', item)
      this.$router.go(-1)
    },
    addHomeAddress () {
      this.$router.push({
        path: '/addSchoolAddress'
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './schoolAddress.styl'
</style>
