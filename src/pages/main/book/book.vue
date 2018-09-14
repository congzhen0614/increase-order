<template>
  <div class="solicit-subscription-book">
    <header class="book-seek">
      <p @click="toAgelist"><span>{{ ageContent }}</span><img src="../../../assets/pull-down-icon.png"></p>
      <p @click="toTypelist"><span>{{ typeContent }}</span><img src="../../../assets/pull-down-icon.png"></p>
    </header>
    <ul class="list-right" v-if="lists.length > 0">
      <li v-for="(item, index) in lists" :key="index" v-if="index % 2 === 0" @click="toDetail(item)">
        <div class="list-img">
          <img :src="item.logo">
        </div>
        <div class="list-content">
          <p class="list-title">{{ item.name | cutStr(15) }}</p>
          <p class="list-author">作者<span>{{ item.author }}</span></p>
          <p class="list-pack" v-if="item.hardcover === 1">包装<span>精装</span></p>
          <p class="list-price">
            ￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}元
            <span class="original-price" v-if="item.originalFee">￥{{ item.originalFee | getFixed2 }}</span>
          </p>
          <div class="list-number">
            <img @click.stop="onReduce(item)" v-if="item.quantity > 0" src="../../../assets/minus-icon.png">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img @click.stop="onAdd(item)" src="../../../assets/add-icon.png">
          </div>
        </div>
      </li>
    </ul>
    <ul class="list-left" v-if="lists.length > 0">
      <li v-for="(item, index) in lists" :key="index" v-if="index % 2 === 1" @click="toDetail(item)">
        <div class="list-img">
          <img :src="item.logo">
        </div>
        <div class="list-content">
          <p class="list-title">{{ item.name | cutStr(15) }}</p>
          <p class="list-author">作者<span>{{ item.author }}</span></p>
          <p class="list-pack" v-if="item.hardcover === 1">包装<span>精装</span></p>
          <p class="list-price">
            ￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}元
            <span class="original-price" v-if="item.originalFee">￥{{ item.originalFee | getFixed2 }}</span>
          </p>
          <div class="list-number">
            <img @click.stop="onReduce(item)" v-if="item.quantity > 0" src="../../../assets/minus-icon.png">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img @click.stop="onAdd(item)" src="../../../assets/add-icon.png">
          </div>
        </div>
      </li>
    </ul>
    <p class="noContent" v-if="lists.length === 0">暂无内容</p>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'solicit-subscription-book',
  data () {
    return {
      ageContent: '年龄区间',
      typeContent: '杂志类别'
    }
  },
  props: {
    lists: {
      type: Array
    }
  },
  mounted () {
    this.setMagazineAge()
    this.setMagazineType()
  },
  methods: {
    setMagazineAge () {
      if (store.bookAge.length > 0) {
        let str = ''
        store.bookAge.forEach((item, index) => {
          if (index > 0) {
            str += ','
          }
          str += item.name
        })
        this.ageContent = str
      }
    },
    setMagazineType () {
      if (store.bookType.length > 0) {
        let str = ''
        store.bookType.forEach((item, index) => {
          if (index > 0) {
            str += ','
          }
          str += item.name
        })
        this.typeContent = str
      }
    },
    toAgelist () {
      this.$router.push({
        path: '/ageList',
        query: {
          name: 'book'
        }
      })
    },
    toTypelist () {
      this.$router.push({
        path: '/typeList',
        query: {
          name: 'book'
        }
      })
    },
    onReduce (item) {
      store.quantity -= 1
      item.quantity -= 1
      store.shoppingcarBook.forEach((obj, index) => {
        if (item.id === obj.id) {
          if (item.quantity === 0) {
            store.shoppingcarBook.splice(index, 1)
          } else {
            obj.quantity = item.quantity
          }
        }
      })
    },
    onAdd (item) {
      store.quantity += 1
      item.quantity += 1
      let exist = false
      if (store.shoppingcarBook.length > 0) {
        store.shoppingcarBook.forEach(obj => {
          if (item.id === obj.id) {
            exist = true
            obj = item
          }
        })
        if (!exist) store.shoppingcarBook.push(item)
      } else {
        store.shoppingcarBook.push(item)
      }
    },
    toDetail (item) {
      this.$router.push({
        path: '/bookDetail',
        query: {
          item: JSON.stringify(item)
        }
      })
    }
  },
  watch: {
    ageContent () {
      let ageArr = []
      store.bookAge.forEach(item => {
        ageArr.push(item.id)
      })
      this.$emit('ageChange', ageArr.join(','))
    },
    typeContent () {
      let typeArr = []
      store.bookType.forEach(item => {
        typeArr.push(item.id)
      })
      this.$emit('typeChange', typeArr.join(','))
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './book.styl'
</style>
