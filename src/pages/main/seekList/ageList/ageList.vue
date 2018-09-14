<template>
  <div class="solicit-subscription-age">
    <ul>
      <li>
        <span>全部</span>
        <img v-if="!selectAll" @click="onCheckAll()" src="../../../../assets/check-icon.png">
        <img v-if="selectAll" @click="onCheckedAll()" src="../../../../assets/checked-icon.png">
      </li>
      <li v-for="(item, index) in dataList" :key="index">
        <span>{{ item.name }}</span>
        <img v-if="item.select === 0" @click="onCheck(item)" src="../../../../assets/check-icon.png">
        <img v-if="item.select === 1" @click="onChecked(item)" src="../../../../assets/checked-icon.png">
      </li>
    </ul>
    <div class="footer-button">
      <span @click="onCancel">取消</span>
      <span @click="onConfirm">确定</span>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'solicit-subscription-age',
  data () {
    return {
      dataList: [],
      selectAll: false,
      selects: []
    }
  },
  mounted () {
    if (this.$route.query.name === 'maga') {
      this.selects = store.magazineAge
    } else {
      this.selects = store.bookAge
    }
    this.loadItemageList()
  },
  methods: {
    loadItemageList () {
      this.$axios.itemageList().then(res => {
        if (res.data.code === '0') {
          if (res.data.data.length === this.selects.length) {
            this.selectAll = true
          }
          res.data.data.forEach(item => {
            this.dataList.push({
              id: item.id,
              name: item.name,
              select: JSON.stringify(this.selects).indexOf(item.id) > -1 ? 1 : 0
            })
          })
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
    onCheckAll () {
      this.dataList.forEach(item => {
        this.selects.push(item)
        item.select = 1
      })
      this.selectAll = true
    },
    onCheckedAll () {
      this.dataList.forEach(item => {
        item.select = 0
      })
      this.selects = []
      this.selectAll = false
    },
    onCheck (item) {
      item.select = 1
      this.selects.push({
        id: item.id,
        name: item.name
      })
      if (this.selects.length === this.dataList.length) {
        this.selectAll = true
      }
    },
    onChecked (item) {
      item.select = 0
      this.selects.forEach((items, index) => {
        if (item.id === items.id) {
          this.selects.splice(index, 1)
        }
      })
      if (this.selects.length < this.dataList.length) {
        this.selectAll = false
      }
    },
    onConfirm () {
      if (this.$route.query.name === 'maga') {
        store.magazineAge = this.selects
      } else {
        store.bookAge = this.selects
      }
      this.$router.goBack()
    },
    onCancel () {
      if (this.$route.query.name === 'maga') {
        store.magazineAge = []
      } else {
        store.bookAge = []
      }
      this.$router.goBack()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'ageList.styl'
</style>
