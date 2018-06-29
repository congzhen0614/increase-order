<template>
  <div class="order-remarks">
    <div class="textarea">
      <textarea placeholder="请在此输入您的留言内容" v-model="contnet"></textarea>
      <p class="words-number"><span :class="{exceed: contnet.length>50}">{{ contnet.length }}</span> / <span>50</span></p>
      <span class="remarks-submit" @click.stop="remarkSubmit()">提交</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      contnet: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    remarkSubmit () {
      if (this.contnet.length > 50) {
        alert('最多能填写50个字')
      } else {
        this.$root.Bus.$emit('remarks', this.contnet)
        this.$router.goBack()
      }
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './remarks.styl'
</style>
