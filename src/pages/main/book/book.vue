<template>
  <div class="solicit-subscription-book">
    <header class="book-seek">
      <p><span>年龄区间</span><img src="../../../assets/pull-down-icon.png"></p>
      <p><span>图书类别</span><img src="../../../assets/pull-down-icon.png"></p>
    </header>
    <ul :class="{'list-left': index===0, 'list-right': index===1}" v-for="(list, index) in lists" :key="index">
      <li v-for="(item, index) in list" :key="index" @click.stop="toDetail(item)">
        <div class="list-img">
          <img src="../../../assets/books/1.png">
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
            <img v-if="item.quantity > 0" src="../../../assets/minus-icon.png">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img src="../../../assets/add-icon.png">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-book',
  components: {},
  data () {
    return {
      lists: [[{
        id: 1,
        name: '1刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称',
        describe: '益智DIY万变串珠+益智DIY万变串珠+益智DIY万变串珠',
        validity: '半年12期(2018.1~2018.6)',
        quantity: 0,
        price: '99.99',
        pack: '精装',
        author: '张三',
        media: 'audio'
      }], [{
        id: 1,
        name: '1刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称刊物名称',
        describe: '益智DIY万变串珠+益智DIY万变串珠+益智DIY万变串珠',
        validity: '半年12期(2018.1~2018.6)',
        quantity: 0,
        price: '99.99',
        pack: '精装',
        author: '张三',
        media: 'audio'
      }]]
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
    @import './book.styl'
</style>
