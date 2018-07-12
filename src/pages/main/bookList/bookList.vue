<template>
  <div class="increase-order-book">
    <div class="book-seek">
      <p @click="selectGrad"><span>年级区间</span></p>
      <p @click="selectType"><span>图书类别</span></p>
    </div>
    <ul :class="{'list-left': index===0, 'list-right': index===1}" v-for="(list, index) in lists" :key="index">
      <li v-for="(item, index) in list" :key="index" @click.stop="toDetail(item)">
        <div class="list-img">
          <img src="../../../assets/book.jpg">
        </div>
        <div class="list-content">
          <p class="list-title">{{ item.name | cutStr(15) }}</p>
          <p class="list-author">作者<span>{{ item.author }}</span></p>
          <p class="list-pack">包装<span>{{ item.pack }}</span></p>
          <p class="list-price">
            ￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}元
            <span class="original-price">￥{{ item.price | getFixed2 }}</span>
          </p>
          <div class="list-number">
            <img v-if="item.quantity > 0" src="../../../assets/reduce_icon.png" @click.stop="clickReduce(item, item.id)">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img src="../../../assets/add_icon.png" @click.stop="clickAdd(item, item.id)">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import shoppingCar from '@/store/shoppingCar.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      lists: [],
      totalQuantity: 0
    }
  },
  props: {
    listData: {
      type: Array
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    selectGrad () {
      this.$router.push({
        path: '/gradeSeek'
      })
    },
    selectType () {
      this.$router.push({
        path: '/bookSeek'
      })
    },
    clickAdd (param, id) {
      param.quantity += 1
      this.totalQuantity += 1
      let exist = false
      if (shoppingCar.bookList.length > 0) {
        shoppingCar.bookList.forEach(item => {
          if (item.id === id) {
            item.quantity = param.quantity
            exist = true
          }
        })
        if (!exist) {
          shoppingCar.bookList.push(param)
        }
      } else {
        shoppingCar.bookList.push(param)
      }
    },
    clickReduce (param, id) {
      param.quantity -= 1
      this.totalQuantity -= 1
      shoppingCar.bookList.forEach((item, index) => {
        if (item.id === id) {
          if (param.quantity === 0) {
            shoppingCar.bookList.splice(index, 1)
          } else {
            item.quantity = param.quantity
          }
        }
      })
    },
    toDetail (item) {
      this.$router.push({
        path: '/bookDetail',
        query: item
      })
    }
  },
  watch: {
    listData (list) {
      let list1 = []
      let list2 = []
      list.forEach(itemi => {
        shoppingCar.bookList.forEach(itemj => {
          if (itemi.id === itemj.id) {
            itemi.quantity = itemj.quantity
          }
        })
      })
      list.forEach((item, index) => {
        if (index % 2 === 0) {
          list1.push(item)
        } else {
          list2.push(item)
        }
      })
      this.lists.push(list1)
      this.lists.push(list2)
    },
    totalQuantity () {
      this.$emit('shoppingCar')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bookList.styl'
</style>
