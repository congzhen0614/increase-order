<template>
  <div class="about-us">
    <img class="sun-icon" src="../../assets/sun-icon.png"/>
    <p> 微校网是一款关注3~12岁儿童成长的APP。深层剖析少儿心理，探讨先进教育理念；专一搜罗和挑选最新的优秀内容；提供衣食住行的全面索引，方便一家人的学习和生活。我们衷心希望能让您的孩子快乐地学习，健康地成长！</p>
    <div class="about-button">
      <img class="upload" src="../../assets/upload.png"/>
      <img class="contact" src="../../assets/contact.png"/>
    </div>
    <img class="swei-icon" src="../../assets/weixiao-icon.png"/>
    <v-nav :navName="'了解我们'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
export default {
  name: 'about-us',
  components: {
    'v-nav': nav
  },
  data () {
    return {

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
  @import './aboutus.styl'
</style>
