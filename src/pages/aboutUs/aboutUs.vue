<template>
  <div class="about-us">
    <img class="sun-icon" src="../../assets/sun-icon.png"/>
    <p> 微校网是一款关注3~12岁儿童成长的APP。深层剖析少儿心理，探讨先进教育理念；专一搜罗和挑选最新的优秀内容；提供衣食住行的全面索引，方便一家人的学习和生活。我们衷心希望能让您的孩子快乐地学习，健康地成长！</p>
    <div class="about-button">
      <img class="upload" @click="clickUpload" src="../../assets/upload.png"/>
      <img class="contact"  @click="isShowContact = !isShowContact" src="../../assets/contact.png"/>
    </div>
    <img class="swei-icon" src="../../assets/weixiao-icon.png"/>
    <v-nav :navName="'了解我们'"></v-nav>
    <div class="shade" v-if="isShowContact" @click="isShowContact = !isShowContact">
      <div class="contact-us">
        <p class="contact-serve">联系客服</p>
        <p class="contact-phone">400-847-0068</p>
        <p class="contact-hours">工作时间：周一到周五 09:00~17:30(法定节假日除外)</p>
        <span class="contact-call" @click.stop="clickPhone">拨打电话</span>
        <span class="contact-cancel" @click.stop="isShowContact = !isShowContact">取消</span>
      </div>
    </div>
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
      isShowContact: false,
      iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
      androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr'
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    clickUpload () {
      if (this.isIos) {
        window.location.href = this.iosDownload
      } else {
        window.location.href = this.androidDownload
      }
    },
    clickPhone () {
      window.location.href = 'tel:4008470068'
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './aboutus.styl'
</style>
